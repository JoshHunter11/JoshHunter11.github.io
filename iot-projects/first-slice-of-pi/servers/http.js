var sensorRoutes = require('./../routes/sensors');

var actuatorRoutes = require('./../routes/actuators');

const express = require("express"),
  cors = require("cors");
var app = express();
app.use(cors());

app.use('/pi/sensors', sensorRoutes);

app.use('/pi/actuators', actuatorRoutes);

app.get("/", function (req, res) {
  res.send("Someone has pinged the home page!");
});

app.get("/pi", function (req, res) {
  res.send("Welcome to the first level of the pi");
});

module.exports = app;
//i have looked through all of the files
