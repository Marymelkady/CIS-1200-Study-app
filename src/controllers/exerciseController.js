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
      
      if (user.totalPoints >= 150) user.proficiencyLevel = 'C2';
      else if (user.totalPoints >= 120) user.proficiencyLevel = 'C1';
      else if (user.totalPoints >= 90) user.proficiencyLevel = 'B2';
      else if (user.totalPoints >= 60) user.proficiencyLevel = 'B1';
      else if (user.totalPoints >= 30) user.proficiencyLevel = 'A2';
      else user.proficiencyLevel = 'A1';
      
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
