const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.PORT || 4000;
const app = express();

const taskRoutes = require("./routes/taskRoute");
const userRoutes = require("./routes/userRoute");
const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use("/", taskRoutes);
app.use("/", userRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/todoDB", {})
  .then(() => console.log("Database Connection Success!"));

app.listen(port, () => {
  console.log("Server is running in port 4000");
});
