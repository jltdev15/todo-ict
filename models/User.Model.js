// Import the library or dependency
// ES5 Javascript
const mongoose = require("mongoose");

// Create Structure or Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

// Create model and assign schema
const User = mongoose.model("User", userSchema);

module.exports = User;