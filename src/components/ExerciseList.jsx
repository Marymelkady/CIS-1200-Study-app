import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ topic: '', difficulty: '' });

  useEffect(() => {
    fetchExercises();
  }, [filter]);

  const fetchExercises = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter.topic) params.append('topic', filter.topic);
      if (filter.difficulty) params.append('difficulty', filter.difficulty);
      const res = await API.get(`/exercises?${params}`);
      setExercises(res.data.exercises);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    } finally {
      setLoading(false);
    }
  };

  const topics = ['data-types', 'recursion', 'functional-programming', 'lists', 'pattern-matching', 'higher-order-functions', 'modules', 'mutable-state', 'object-oriented'];
  const difficulties = ['beginner', 'intermediate', 'advanced'];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Practice Exercises</h2>
      <div className="mb-6 flex flex-wrap gap-4">
        <select
          className="px-3 py-2 border rounded"
          value={filter.topic}
          onChange={(e) => setFilter({ ...filter, topic: e.target.value })}
        >
          <option value="">All Topics</option>
          {topics.map(t => <option key={t} value={t}>{t.replace('-', ' ')}</option>)}
        </select>
        <select
          className="px-3 py-2 border rounded"
          value={filter.difficulty}
          onChange={(e) => setFilter({ ...filter, difficulty: e.target.value })}
        >
          <option value="">All Difficulties</option>
          {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <button
          onClick={() => setFilter({ topic: '', difficulty: '' })}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Clear Filters
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="grid gap-4">
          {exercises.map(ex => (
            <div key={ex._id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
              <Link to={`/exercises/${ex._id}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{ex.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{ex.topic.replace('-', ' ')}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-sm ${
                    ex.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                    ex.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {ex.difficulty}
                  </span>
                </div>
                <p className="text-gray-700 mt-2">{ex.question.substring(0, 100)}...</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExerciseList;
