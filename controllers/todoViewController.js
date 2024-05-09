const Task = require("../models/Todo.Model");
const User = require("../models/User.Model");
exports.getAllTask = async function (req, res) {
  try {
    const tasks = await User.findOne({ username: req.user.username })
      .populate("taskList")
      .exec();

    if (tasks.length === 0) {
      return res.status(204).json({
        content: "No content",
      });
    }
    res.status(200).json({
      content: tasks.taskList,
    });
  } catch (err) {
    res.status(404).json({
      status: "Error",
      content: err,
    });
  }
};

// Get Single Task and Display to Frontend
exports.getSingleTask = async function (req, res) {
  try {
    const singleTask = await Task.findById(req.params.id);
    if (!singleTask) {
      return res.render("errorpage", {
        content: "No content",
      });
    }
    res.render("taskItem", {
      task: singleTask,
    });
  } catch (err) {
    res.status(404).json({
      status: "Error",
      content: err,
    });
  }
};
exports.getSingleTaskDelete = async function (req, res) {
  try {
    const singleTask = await Task.findById(req.params.id);
    if (!singleTask) {
      return res.render("errorpage", {
        content: "No content",
      });
    }
    res.render("deleteTaskView", {
      task: singleTask,
    });
  } catch (err) {
    res.status(404).json({
      status: "Error",
      content: err,
    });
  }
};
