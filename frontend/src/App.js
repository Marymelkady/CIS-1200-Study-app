import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ExerciseList from './components/ExerciseList';
import ExerciseDetail from './components/ExerciseDetail';
import OCamlIDE from './components/IDE/OCamlIDE';
import VideoSection from './components/VideoSection';
import ProficiencyTest from './components/ProficiencyTest';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/exercises" element={<ExerciseList />} />
            <Route path="/exercises/:id" element={<ExerciseDetail />} />
            <Route path="/ide" element={<OCamlIDE />} />
            <Route path="/videos" element={<VideoSection />} />
            <Route path="/test" element={<ProficiencyTest />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
