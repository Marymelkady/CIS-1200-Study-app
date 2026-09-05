import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';

const ProficiencyTest = () => {
  const { user, getProfile } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState('');
  const [saving, setSaving] = useState(false);

  const questions = [
    {
      id: 1,
      topic: 'Basics',
      question: 'What is the correct way to define a variable in OCaml?',
      options: ['let x = 5', 'var x = 5', 'int x = 5', 'x = 5'],
      correct: 0,
      explanation: 'In OCaml, variables are defined using the `let` keyword.'
    },
    {
      id: 2,
      topic: 'Functions',
      question: 'How do you define a function that doubles a number in OCaml?',
      options: [
        'let double x = x * 2',
        'function double(x) { return x * 2; }',
        'def double(x): return x * 2',
        'let double(x) = x * 2'
      ],
      correct: 0,
      explanation: 'OCaml functions are defined with `let function_name parameter = expression`.'
    },
    {
      id: 3,
      topic: 'Lists',
      question: 'What does the `::` operator do in OCaml?',
      options: [
        'Adds an element to the front of a list',
        'Adds an element to the end of a list',
        'Concatenates two lists',
        'Checks if an element is in a list'
      ],
      correct: 0,
      explanation: 'The `::` operator (cons) adds an element to the front of a list.'
    },
    {
      id: 4,
      topic: 'Pattern Matching',
      question: 'What is the base case for a recursive function that processes a list?',
      options: [
        'Empty list []',
        'List with one element',
        'List with two elements',
        'The recursive call'
      ],
      correct: 0,
      explanation: 'The base case is usually the empty list `[]`.'
    },
    {
      id: 5,
      topic: 'Functional Programming',
      question: 'What is a pure function?',
      options: [
        'A function with no side effects',
        'A function that always returns the same output for the same input',
        'A function that doesn\'t modify global state',
        'All of the above'
      ],
      correct: 3,
      explanation: 'Pure functions have no side effects and always return the same output for the same input.'
    },
    {
      id: 6,
      topic: 'Recursion',
      question: 'Which function correctly sums all elements in a list using recursion?',
      options: [
        'let rec sum lst = if lst = [] then 0 else hd lst + sum (tl lst)',
        'let rec sum lst = if lst = [] then 1 else hd lst + sum (tl lst)',
        'let rec sum lst = List.fold_left (+) 0 lst',
        'Both A and C'
      ],
      correct: 3,
      explanation: 'Both the recursive approach and List.fold_left can sum a list correctly.'
    },
    {
      id: 7,
      topic: 'Data Types',
      question: 'Which of these is NOT a basic data type in OCaml?',
      options: ['int', 'float', 'char', 'array'],
      correct: 3,
      explanation: 'int, float, and char are basic types. array is not a basic type.'
    },
    {
      id: 8,
      topic: 'Functional Programming',
      question: 'What is the purpose of `List.map`?',
      options: [
        'Applies a function to each element and returns a new list',
        'Reduces a list to a single value',
        'Filters elements based on a condition',
        'Reverses the list'
      ],
      correct: 0,
      explanation: 'List.map applies a function to each element and returns a new list of results.'
    },
    {
      id: 9,
      topic: 'Pattern Matching',
      question: 'In a match expression, what does the wildcard pattern `_` do?',
      options: [
        'Matches any value but doesn\'t bind it',
        'Matches an empty list',
        'Matches a value and binds it to a variable',
        'Matches only numbers'
      ],
      correct: 0,
      explanation: 'The wildcard `_` matches any value without binding it to a variable.'
    },
    {
      id: 10,
      topic: 'Modules',
      question: 'What is the purpose of modules in OCaml?',
      options: [
        'Code organization and namespacing',
        'Creating data structures',
        'Defining functions',
        'All of the above'
      ],
      correct: 3,
      explanation: 'Modules provide code organization, namespacing, and can contain data structures and functions.'
    }
  ];

  const handleAnswer = (selectedIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    let correctCount = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correct) {
        correctCount++;
      }
    });
    setScore(correctCount);

    const percentage = (correctCount / questions.length) * 100;
    let newLevel = 'A1';
    if (percentage >= 90) newLevel = 'C2';
    else if (percentage >= 80) newLevel = 'C1';
    else if (percentage >= 70) newLevel = 'B2';
    else if (percentage >= 60) newLevel = 'B1';
    else if (percentage >= 50) newLevel = 'A2';
    else newLevel = 'A1';
    setLevel(newLevel);

    setShowResults(true);

    // Save to backend if logged in
    if (user) {
      setSaving(true);
      try {
        await API.post('/auth/update-level', { level: newLevel });
        await getProfile();
      } catch (error) {
        console.error('Failed to save level:', error);
        alert('Failed to save test results. Please try again.');
      } finally {
        setSaving(false);
      }
    }
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setScore(0);
    setLevel('');
  };

  if (showResults) {
    return (
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Test Results</h2>
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <span className="text-6xl font-bold text-blue-600">{score}</span>
            <span className="text-3xl text-gray-600">/{questions.length}</span>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Your Proficiency Level</h3>
            <div className="text-7xl font-bold text-red-600">{level}</div>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <p className="text-gray-700">
              {level === 'C2' && 'Mastery level - you demonstrate expert understanding of OCaml concepts!'}
              {level === 'C1' && 'Advanced level - you show strong understanding of OCaml concepts!'}
              {level === 'B2' && 'Upper-intermediate - you have a solid grasp of OCaml fundamentals.'}
              {level === 'B1' && 'Intermediate - you understand basic OCaml concepts.'}
              {level === 'A2' && 'Elementary - you have a basic understanding of OCaml.'}
              {level === 'A1' && 'Beginner - you are starting your OCaml journey.'}
            </p>
          </div>
          {saving && (
            <div className="text-blue-600 mb-4">Saving results...</div>
          )}
          {user && !saving && (
            <div className="text-green-600 mb-4">✅ Results saved to your profile!</div>
          )}
          {!user && (
            <div className="text-gray-600 mb-4">💡 Login to save your results!</div>
          )}
          <button
            onClick={resetTest}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Retake Test
          </button>
        </div>
      </div>
    );
  }

  const current = questions[currentQuestion];
  const answered = answers[currentQuestion] !== undefined;

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">OCaml Proficiency Test</h2>
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
        <p className="text-sm text-blue-700">
          Answer all {questions.length} questions to determine your OCaml proficiency level.
          You'll receive a level from A1 (Beginner) to C2 (Master).
          {user && ' Results will be saved to your profile!'}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">Question {currentQuestion + 1} of {questions.length}</span>
          <span className="text-sm text-gray-500">Topic: {current.topic}</span>
        </div>

        <div className="w-full bg-gray-200 h-2 rounded mb-6">
          <div
            className="bg-blue-600 h-2 rounded transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>

        <h3 className="text-xl font-semibold mb-6">{current.question}</h3>

        <div className="space-y-3 mb-6">
          {current.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full text-left p-3 border rounded transition ${
                answers[currentQuestion] === index
                  ? 'bg-blue-100 border-blue-500'
                  : 'hover:bg-gray-50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
          >
            ← Previous
          </button>
          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={!answered}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              Submit Test
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!answered}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProficiencyTest;
