// Import the model from the models folder
const Task = require("../models/Todo.Model");
const User = require("../models/User.Model");
// Add single task
exports.createTask = async function (req, res) {
  console.log(req.user.username);
  console.log(req.body);
  try {
    // Query the user currently login to get the field tasklist
    const getCurrentUser = await User.findOne({ username: req.user.username });

    const newTask = new Task({
      taskName: req.body.taskName,
    });

    // Saving the Task to Task Model
    await newTask.save();

    getCurrentUser.taskList.push(newTask);

    res.status(200).json({
      message: "Task added to " + getCurrentUser.username,
    });

    await getCurrentUser.save();
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
      {
        taskName: req.body.taskName,
      },
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
