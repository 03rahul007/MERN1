const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://hulk:imagineuniverse@initial.4mjbrzl.mongodb.net/customeReactPractice"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error(err));

// Corrected schema
const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true }, // Corrected required syntax
    email: { type: String, unique: true, required: true }, // Corrected required syntax
    desc: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);