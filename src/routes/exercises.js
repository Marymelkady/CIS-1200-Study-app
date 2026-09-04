const express = require('express');
const router = express.Router();
const { getExercises, getExerciseById, submitAnswer } = require('../controllers/exerciseController');
const { protect } = require('../middleware/auth');

// Make GET routes public (no authentication required)
router.get('/', getExercises);
router.get('/:id', getExerciseById);

// Keep POST route protected (requires login to save progress)
router.post('/:id/submit', protect, submitAnswer);

module.exports = router;
