const Task = require("../models/Todo.Model");

exports.getAllTask = async function (req, res) {
  try {
    const tasks = await Task.find().exec();
    res.render("index", {
      foundTask: tasks,
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
