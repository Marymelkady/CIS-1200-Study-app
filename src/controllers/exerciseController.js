const Exercise = require('../models/Exercise');
const Progress = require('../models/Progress');
const User = require('../models/User');

const getExercises = async (req, res) => {
  try {
    const { topic, difficulty } = req.query;
    const filter = {};
    if (topic) filter.topic = topic;
    if (difficulty) filter.difficulty = difficulty;

    const exercises = await Exercise.find(filter);
    res.json({ success: true, count: exercises.length, exercises });
  } catch (error) {
    console.error('Get exercises error:', error);
    res.status(500).json({ error: 'Failed to fetch exercises' });
  }
};

const getExerciseById = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ error: 'Exercise not found' });
    }
    res.json({ success: true, exercise });
  } catch (error) {
    console.error('Get exercise error:', error);
    res.status(500).json({ error: 'Failed to fetch exercise' });
  }
};

const submitAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { answer } = req.body;
    const userId = req.user.id;

    const exercise = await Exercise.findById(id);
    if (!exercise) {
      return res.status(404).json({ error: 'Exercise not found' });
    }

    const isCorrect = answer === exercise.correctAnswer;

    let progress = await Progress.findOne({ user: userId, exercise: id });
    if (progress) {
      progress.attempts += 1;
      progress.correct = isCorrect;
      progress.completed = true;
      progress.lastAttempt = Date.now();
    } else {
      progress = new Progress({
        user: userId,
        exercise: id,
        completed: true,
        correct: isCorrect,
        attempts: 1
      });
    }
    await progress.save();

    if (isCorrect) {
      const user = await User.findById(userId);
      user.totalPoints += exercise.points;
      user.exercisesCompleted += 1;
      
      // Level up logic based on total points
      const points = user.totalPoints;
      let newLevel = 'A1';
      if (points >= 150) newLevel = 'C2';
      else if (points >= 120) newLevel = 'C1';
      else if (points >= 90) newLevel = 'B2';
      else if (points >= 60) newLevel = 'B1';
      else if (points >= 30) newLevel = 'A2';
      else newLevel = 'A1';
      
      user.proficiencyLevel = newLevel;
      await user.save();
    }

    res.json({
      success: true,
      correct: isCorrect,
      explanation: exercise.explanation,
      pointsEarned: isCorrect ? exercise.points : 0,
      progress: {
        attempts: progress.attempts,
        completed: progress.completed,
        correct: progress.correct
      }
    });
  } catch (error) {
    console.error('Submit answer error:', error);
    res.status(500).json({ error: 'Failed to submit answer' });
  }
};

module.exports = { getExercises, getExerciseById, submitAnswer };
