import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import router from "./routes/router.js";

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

export default app;
