import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, completed: 0, points: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await API.get('/exercises');
      setStats({
        total: res.data.count || 0,
        completed: user?.exercisesCompleted || 0,
        points: user?.totalPoints || 0,
      });
    } catch (error) {
      console.error('Stats error:', error);
      // Fallback: try to get exercises count
      try {
        const res = await API.get('/exercises');
        setStats({
          total: res.data.exercises?.length || 0,
          completed: 0,
          points: 0,
        });
      } catch (e) {
        console.error('Fallback stats error:', e);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome to CIS 1200 Study Tool</h1>
      <p className="text-lg text-gray-600 mb-8">
        Practice OCaml concepts from the University of Pennsylvania's CIS 1200 course.
      </p>

      {!user && (
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
          <p className="font-semibold text-blue-800">Guest Mode</p>
          <p className="text-blue-700">
            You're viewing content as a guest. <Link to="/login" className="underline text-red-700">Login</Link> or <Link to="/register" className="underline text-red-700">Register</Link> to track your progress!
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="cis-card">
          <h3 className="text-gray-600 text-sm uppercase tracking-wide">Total Exercises</h3>
          <p className="text-4xl font-bold text-gray-800">{loading ? '...' : stats.total}</p>
        </div>
        <div className="cis-card">
          <h3 className="text-gray-600 text-sm uppercase tracking-wide">Completed</h3>
          <p className="text-4xl font-bold text-gray-800">{loading ? '...' : stats.completed}</p>
        </div>
        <div className="cis-card">
          <h3 className="text-gray-600 text-sm uppercase tracking-wide">Total Points</h3>
          <p className="text-4xl font-bold text-gray-800">{loading ? '...' : stats.points}</p>
        </div>
      </div>

      <div className="cis-card">
        <h3 className="text-xl font-semibold mb-2">Proficiency Level</h3>
        <div className="flex items-center">
          <span className="text-5xl font-bold text-red-700">{user?.proficiencyLevel || 'A1'}</span>
          <span className="ml-4 text-gray-600">Complete exercises to advance through A1 → C2</span>
        </div>
      </div>

      <div className="mt-6">
        <Link to="/exercises" className="cis-button cis-button-primary text-lg px-8 py-3 inline-block">
          Start Practicing
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
