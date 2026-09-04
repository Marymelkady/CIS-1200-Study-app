const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  topic: {
    type: String,
    required: true,
    enum: ["data-types", "recursion", "functional-programming", "lists", 
           "pattern-matching", "higher-order-functions", "modules", 
           "mutable-state", "object-oriented"]
  },
  difficulty: {
    type: String,
    required: true,
    enum: ["beginner", "intermediate", "advanced"]
  },
  question: {
    type: String,
    required: true
  },
  options: [{
    type: String,
    required: true
  }],
  correctAnswer: {
    type: String,
    required: true
  },
  explanation: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    default: 10
  }
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
