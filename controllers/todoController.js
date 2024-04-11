// Import the model from the models folder
const Task = require("../models/Todo.Model");

// Add single task
exports.createTask = async function (req, res) {
  console.log(req.body);
  try {
    const newTask = await Task.create(req.body);
    if (!newTask) {
      return res.status(403).json({
        content: "Please fill up the task",
      });
    }
    res.redirect("/");
  } catch (err) {
    res.status(400).json({
      response: err,
    });
  }
};
// Update single task
exports.updateTask = async function (req, res) {
  console.log(req.body.id);
  console.log(req.body);
  try {
    const updatedData = await Task.findByIdAndUpdate(
      req.body.id,
      { taskName: req.body.taskName },
      {
        new: true,
        runValidators: true,
      }
    );
    console.log(updatedData);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

// Delete Task

exports.deleteTask = async function (req, res) {
  console.log(req.body.id);
  try {
    const deletedTask = await Task.findByIdAndDelete(req.body.id);
    if (deletedTask) {
      return res.redirect("/");
    }
  } catch (err) {
    console.error("Error deleting task : ", err);
  }
};
