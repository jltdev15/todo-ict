const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.PORT || 4000;
const app = express();

app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const Schema = mongoose.Schema;
const todoSchema = new Schema({
  taskName: String,
});

const Task = mongoose.model("Task", todoSchema);

// Get all the task
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find().exec();
    res.status(200).json({
      response: tasks,
    });
  } catch (err) {
    console.log(err);
  }
});

// Add single task
app.post("/task", async (req, res) => {
  // try {
  //   const newTask = await Task.create(req.body);
  //   res.status(200).json({
  //     status: "Success",
  //     data: newTask,
  //   });
  // } catch (err) {
  //   res.status(400).json({
  //     response: err,
  //   });
  // }
  // To check the content of the body
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
});

// Update single task
app.patch("/tasks/:id", async (req, res) => {
  try {
    const updatedData = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      updated: updatedData,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

// For updating single task
app.post("/updateTask", async function (req, res) {
  console.log(req.body.id);
  console.log(req.body)
  try {
    const updatedData = await Task.findByIdAndUpdate(req.body.id, {taskName: req.body.taskName}, {
      new: true,
      runValidators: true,
    });
    res.redirect('/')
    // res.status(200).json({
    //   content: updatedData
    // })
  } catch (err) {
    console.log(err);
  }
});

// Delete single task
app.delete("/tasks/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    await Task.findByIdAndDelete({ _id: req.params.id });
    res.status(204).json({
      status: "Success",
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

// Get single task
app.get("/task/:id", async function (req, res) {
  try {
    const singleTask = await Task.findById(req.params.id);
    if(!singleTask){
      return res.render('errorpage', {
        content: 'No content'
      })
    }
    // res.status(200).json({
    //   content: singleTask
    // })
    res.render("taskItem", {
      task: singleTask,
    });
    console.log(singleTask);
  } catch (err) {
    console.log(err);
  }
});

// get all Views and display to the dashboard
app.get("/", async function (req, res) {
  try {
    const tasks = await Task.find().exec();
    res.render("index", {
      foundTask: tasks,
    });
  } catch (err) {}
});
mongoose
  .connect("mongodb://127.0.0.1:27017/todoDB", {})
  .then(() => console.log("Connections Success!"));

app.listen(port, () => {
  console.log("Server is running in port 4000");
});
