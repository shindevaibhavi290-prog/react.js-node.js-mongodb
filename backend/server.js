const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB replica set");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Job Schema
const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  salary: String,
  experience: String,
  skills: [String],
  jobType: String,
  description: String
});

const Job = mongoose.model("Job", jobSchema);

// Home
app.get("/", (req, res) => {
  res.send("Job Portal");
});

// Get all jobs
app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// Add job
app.post("/api/jobs", async (req, res) => {
  try {
    const job = new Job(req.body);
    const savedJob = await job.save();

    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// Update job
app.put("/api/jobs/:id", async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// Delete job
app.delete("/api/jobs/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);

    res.json({
      message: "Job deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

app.listen(3000, () => {
  console.log("Job Portal backend running on port 3000");
});
