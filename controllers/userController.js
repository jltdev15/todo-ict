// Import the model from the models folder
const Task = require("../models/Todo.Model");
const User = require("../models/User.Model");
const bcrypt = require("bcryptjs");

// Add single task
exports.registerAccount = async function (req, res) {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      username: username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({
      content: hashedPassword,
      user: newUser,
    });
  } catch (err) {
    console.log(err);
  }

  // try {
  //     const newTask = await User.create(req.body);
  //     if (!newTask) {
  //         return res.status(403).json({
  //             content: "Please fill up the task",
  //         });
  //     }
  //     res.status(200).json({
  //         status: 'Success',
  //         content: newTask
  //     })
  // } catch (err) {
  //     res.status(400).json({
  //         response: err,
  //     });
  // }
};

exports.getAllUsers = async (req, res) => {
  try {
    const foundUser = User.find().exec();
    if (foundUser) {
      return res.status(200).json({
        status: "Success",
        content: foundUser,
      });
    }
    return res.send("No users found");
  } catch (err) {
    console.log(err);
  }
};
