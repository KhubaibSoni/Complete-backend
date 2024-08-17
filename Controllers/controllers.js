const Workout = require('../Models/WorkoutSchema');
const mongoose = require('mongoose');
const Creator = require('../Models/Creator');

// Get all workouts
const GetAll = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming req.user contains the user's ID
    const workouts = await Creator.find({ owner: userId }).populate("workout");
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'No Workouts created', error: error.message });
  }
};

// Create A Workout
const CreateNew = async (req, res) => {
  const userId = req.user._id; // Assuming req.user contains the user's ID
  const { title, reps, weight } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }
  if (!weight) {
    emptyFields.push('weight');
  }
  if (!reps) {
    emptyFields.push('reps');
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
  }

  try {
    const exercise = await Workout.create({ title, reps, weight });

    const creator = await Creator.create({ owner: userId, workout: exercise._id });

    res.status(201).json({ exercise }); // Send response after both are created
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Workout
const DeleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'No such workout' });
  }

  try {
    const workout = await Workout.findOneAndDelete({ _id: id });

    if (!workout) {
      return res.status(400).json({ message: 'No such workout' });
    }

    // Also delete the creator relationship
    await Creator.findOneAndDelete({ workout: id });

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting workout', error: error.message });
  }
};

// Find Workout
const Find = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid ID' });
  }

  try {
    const workout = await Workout.findById(id);

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ message: 'Error finding workout', error: error.message });
  }
};

// Update Workout
const UpdateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true } // Return the updated document
    );

    if (!workout) {
      return res.status(400).json({ message: 'Workout not found' });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ message: 'Error updating workout', error: error.message });
  }
};

module.exports = {
  GetAll,
  CreateNew,
  DeleteWorkout,
  Find,
  UpdateWorkout,
};
