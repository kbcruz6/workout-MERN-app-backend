const Workout = require("../models/workoutModel.js");
const mongoose = require("mongoose");
const { isValidObjectId } = require("mongoose");
mongoose.set("strictQuery", false);

//! GET all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find(
    {},
    {
      // _id: 0,
      __v: 0,
      // createdAt: 0,
      updatedAt: 0,
    }
  )
    .sort({ title: 1 })
    .populate({ path: "complementWith", select: "title reps load -_id" });
  res.status(200).json(workouts);
};

//! GET a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(404).json({ error: "Wrong id !" });
  }

  const workout = await Workout.findOne(
    { _id: id },
    {
      _id: 0,
      __v: 0,
      // createdAt: 0,
      updatedAt: 0,
    }
  ).populate({ path: "complementWith", select: "title reps load -_id" });
  if (!workout) {
    return res.status(404).json({ error: "Not found" });
  }
  res.status(200).json(workout);
};

//! POST a new workout
const createWorkout = async (req, res) => {
  const { title, load, reps, complementWith } = req.body;

  //! Add doc to DB
  try {
    const workout = await Workout.create({ title, load, reps, complementWith });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//! DELETE a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(404).json({ error: "Wrong id !" });
  }

  const workout = await Workout.deleteOne({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: "Not found" });
  }
  res.status(200).json({ deleted: workout });
};

//! UPDATE a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(404).json({ error: "Wrong id !" });
  }

  const workout = await Workout.updateOne(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(404).json({ error: "Not found" });
  }
  res.status(200).json({ updated: workout });
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
