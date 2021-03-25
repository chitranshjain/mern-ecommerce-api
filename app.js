//Importing required packages
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();

//Importing the routes
const userRoutes  = require("./routes/user");

//Initialising the app
const app = express();

//Connecting to the database
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => {
    console.log("Database connection established succesfully.");
});

//Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes middleware
app.use("/api",userRoutes);

const port = process.env.PORT || 8000;

//Initialising the server
app.listen(port, () => {
  console.log("The server is up and running on port " + port);
});
