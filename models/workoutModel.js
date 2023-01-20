const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: Number,
    complementWith: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Workout",
    },
  },
  { timestamps: true }
);

const Workout = model("Workout", workoutSchema);

module.exports = Workout;
