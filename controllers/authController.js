const bcrypt = require("bcryptjs");
const User = require("../models/User.Model");

exports.login = async function (req, res) {
  const { username, password } = req.body;

  try {
    const checkUser = await User.findOne({ username }).exec();
    if (!checkUser) {
      res.status(403).json({
        content: username + "not found",
      });
    }
    console.log(checkUser);
    const passwordMatch = await bcrypt.compare(password, checkUser.password);
    if (!passwordMatch) {
      return res.status(401).json({
        content: "Password is incorrect",
      });
    }

    res.status(200).json({
      content: username + " is available",
      message: "Password is correct",
    });
  } catch (err) {}
};
