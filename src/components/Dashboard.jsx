import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, getProfile } = useAuth();
  const [stats, setStats] = useState({ total: 0, completed: 0, points: 0 });

  useEffect(() => {
    getProfile();
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get('/exercises');
      const completed = user?.exercisesCompleted || 0;
      setStats({
        total: res.data.count,
        completed: completed,
        points: user?.totalPoints || 0,
      });
    } catch (error) {
      console.error('Stats error:', error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500">Total Exercises</h3>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500">Completed</h3>
          <p className="text-3xl font-bold">{stats.completed}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500">Total Points</h3>
          <p className="text-3xl font-bold">{stats.points}</p>
        </div>
      </div>
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Proficiency Level</h3>
        <div className="flex items-center">
          <span className="text-4xl font-bold text-blue-600">{user?.proficiencyLevel || 'A1'}</span>
          <span className="ml-4 text-gray-600">Continue practicing to level up!</span>
        </div>
      </div>
      <div className="mt-6">
        <Link to="/exercises" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Start Practicing
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
