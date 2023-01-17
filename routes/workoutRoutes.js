import express from "express";
import {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} from "../controllers/workoutController.js";

const workoutRouter = express.Router();

//! GET all workouts
workoutRouter.get("/", getWorkouts);

//! GET a single workout
workoutRouter.get("/:id", getWorkout);

//! POST a new workout
workoutRouter.post("/", createWorkout);

//! DELETE a workout
workoutRouter.delete("/:id", deleteWorkout);

//! UPDATE a workout
workoutRouter.patch("/:id", updateWorkout);

export default workoutRouter;
