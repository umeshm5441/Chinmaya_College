const express = require("express");
const mongoose = require("mongoose");
const Enquiry = require("./models/Enquiry");

const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/chinmayaDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Test Route
app.get("/", (req, res) => {
  res.send("Server Running");
});
// Save Enquiry
app.post("/enquiry", async (req, res) => {
  try {
    const newEnquiry = new Enquiry(req.body);
    await newEnquiry.save();
    res.json({ message: "Enquiry Saved Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to Save" });
  }
});

// Start Server
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
