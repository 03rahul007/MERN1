const userModel = require("../models/userModel");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const router = express.Router();

// Create User
router.post("/", async (req, res) => {
  const { username, email, desc } = req.body;

  try {
    const user = await userModel.create({ username, email, desc });
    console.log("User Registered:", user);
    res.status(201).send(user); // 201 for created
  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000) {
      console.log("Duplicate Key Error:", error);
      return res.status(400).json({ error: "Username or Email already exists" });
    }
    res.status(500).json({ error: error.message });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const data = await userModel.find();
    if (data.length === 0) {
      return res.status(404).send("No users found");
    }
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single user by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = await userModel.findById(id);
    if (!data) {
      return res.status(404).send("User not found");
    }
    res.send(data);
  } catch (error) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(400).json({ error: "Invalid user ID" });
    }
  }
});

// Update user by ID
router.patch("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updateUser = await userModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updateUser) {
      return res.status(404).send("User not found");
    }
    res.send(updateUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete user by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = await userModel.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).send("User not found");
    }
    res.send({ message: "User deleted successfully", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;