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

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  city: String
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.send("Node.js server is running");
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
