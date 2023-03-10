const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const router = require("./routes/router.js");

//! Create a express app
const app = express();

//! Global Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

//! Routes
app.use("/api/workouts", router);

//! Connect to DB
const mongoUri = `mongodb+srv://agustintcruz:${process.env.PASS}@redesplus.icmht48.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;

mongoose
  .set("strictQuery", false)
  .connect(mongoUri)
  .then(() => {
    //! Listen for request
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`✔️  Connected to DB & listening on port ${PORT}...`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = app;

//! IF I DONT USE THE FOLDER ROUTES:
// //! GET all workouts
// app.get("/api/workouts", getWorkouts);

// //! GET a single workout
// app.get("/api/workouts/:id", getWorkout);

// //! POST a new workout
// app.post("/api/workouts", createWorkout);

// //! DELETE a workout
// app.delete("/api/workouts/:id", deleteWorkout);

// //! UPDATE a workout
// app.patch("/api/workouts/:id", updateWorkout);
