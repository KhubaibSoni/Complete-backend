const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  title: {
    type: String,  // Use primitive type String
    required: true,
  },
  reps: {
    type: Number,  // Use primitive type Number
    required: true,
  },
  weight: {
    type: Number,  // Use primitive type Number
    required: true,
  },
  owner: {type: mongoose.Types.ObjectId, ref: "User"}
}, { timestamps: true });

module.exports = mongoose.model('Workout', WorkoutSchema);
