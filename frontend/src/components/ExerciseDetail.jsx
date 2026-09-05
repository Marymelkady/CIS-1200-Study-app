import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

const ExerciseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [isGuest, setIsGuest] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchExercise();
    const token = localStorage.getItem('token');
    setIsGuest(!token);
  }, [id]);

  const fetchExercise = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/exercises/${id}`);
      setExercise(res.data.exercise);
    } catch (error) {
      console.error('Error fetching exercise:', error);
      if (error.response?.status === 404) {
        navigate('/exercises');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedAnswer) {
      alert('Please select an answer');
      return;
    }

    setSubmitting(true);

    if (isGuest) {
      const isCorrect = selectedAnswer === exercise.correctAnswer;
      setResult({
        correct: isCorrect,
        explanation: exercise.explanation,
        pointsEarned: isCorrect ? exercise.points : 0,
      });
      setSubmitted(true);
      setSubmitting(false);
      return;
    }

    try {
      const res = await API.post(`/exercises/${id}/submit`, { answer: selectedAnswer });
      setResult(res.data);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert('Failed to submit answer. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = () => {
    navigate('/exercises');
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!exercise) return <div className="text-center py-8">Exercise not found</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={() => navigate('/exercises')} className="text-blue-600 mb-4">&larr; Back to exercises</button>
      {isGuest && (
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6">
          <p className="font-bold">Guest Mode</p>
          <p>You can practice but progress won't be saved. <Link to="/login" className="underline">Login</Link> or <Link to="/register" className="underline">Register</Link> to track your progress!</p>
        </div>
      )}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">{exercise.title}</h2>
          <span className={`px-3 py-1 rounded text-sm ${
            exercise.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
            exercise.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {exercise.difficulty}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4">Topic: {exercise.topic.replace('-', ' ')}</p>
        <p className="text-gray-800 mb-6 text-lg">{exercise.question}</p>

        {exercise.codeSnippet && (
          <pre className="bg-gray-100 p-4 rounded mb-6 overflow-x-auto">
            <code>{exercise.codeSnippet}</code>
          </pre>
        )}

        <div className="space-y-3 mb-6">
          {exercise.options.map((option, index) => (
            <button
              key={index}
              className={`w-full text-left p-3 border rounded transition ${
                submitted
                  ? option === exercise.correctAnswer
                    ? 'bg-green-100 border-green-500'
                    : selectedAnswer === option
                    ? 'bg-red-100 border-red-500'
                    : 'bg-gray-50 border-gray-200'
                  : selectedAnswer === option
                  ? 'bg-blue-100 border-blue-500'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => !submitted && setSelectedAnswer(option)}
              disabled={submitted || submitting}
            >
              {option}
            </button>
          ))}
        </div>

        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Answer'}
          </button>
        ) : (
          <div className="space-y-4">
            <div className={`p-4 rounded ${result.correct ? 'bg-green-100' : 'bg-red-100'}`}>
              <p className="font-semibold">{result.correct ? '✅ Correct!' : '❌ Incorrect'}</p>
              <p className="mt-2">{result.explanation}</p>
              {result.pointsEarned > 0 && !isGuest && (
                <p className="mt-2 text-green-700">+{result.pointsEarned} points!</p>
              )}
              {result.pointsEarned > 0 && isGuest && (
                <p className="mt-2 text-green-700">+{result.pointsEarned} points (Guest mode - not saved)</p>
              )}
            </div>
            <button
              onClick={handleNext}
              className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
            >
              Back to Exercises
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseDetail;
