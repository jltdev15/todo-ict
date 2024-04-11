// Import the library or dependency
// ES5 Javascript
const mongoose = require("mongoose");

// Create Structure or Schema
const todoSchema = new mongoose.Schema({
  taskName: String,
});

// Create model and assign schema
const Task = mongoose.model("Task", todoSchema);

module.exports = Task;
