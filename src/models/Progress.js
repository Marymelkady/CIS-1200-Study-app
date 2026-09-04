const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exercise",
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  correct: {
    type: Boolean,
    default: false
  },
  attempts: {
    type: Number,
    default: 0
  },
  lastAttempt: {
    type: Date,
    default: Date.now
  }
});

ProgressSchema.index({ user: 1, exercise: 1 }, { unique: true });

module.exports = mongoose.model("Progress", ProgressSchema);
