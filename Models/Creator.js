const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CreatorSchema = new Schema({
  owner: { 
    type: mongoose.Types.ObjectId, 
    ref: "User", 
    required: true  // Optional: Ensure that owner is always provided
  },
  workout: { 
    type: mongoose.Types.ObjectId, 
    ref: "Workout", 
    required: true  // Optional: Ensure that workout is always provided
  }
}, { timestamps: true });

module.exports = mongoose.model('Creator', CreatorSchema);
