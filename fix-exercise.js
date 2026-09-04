const mongoose = require('mongoose');
const Exercise = require('./src/models/Exercise');
require('dotenv').config();

async function fixExercise() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find and update the broken exercise
    const result = await Exercise.updateOne(
      { title: "OCaml Syntax: Scoping and let-in" },
      {
        $set: {
          correctAnswer: "6",
          explanation: "The outer `x` is 1, but in the inner `let x = 2 in x + x`, the local `x` (2) shadows the outer one. The calculation is: `1 + (2 + 2) + 1 = 1 + 4 + 1 = 6`."
        }
      }
    );

    if (result.modifiedCount > 0) {
      console.log('✅ Exercise fixed successfully!');
    } else {
      console.log('⚠️ No exercise found with that title. Check if it exists.');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error fixing exercise:', error);
    process.exit(1);
  }
}

fixExercise();
