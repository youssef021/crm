const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express()

app.use(express.static(__dirname + "/public"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const env = require("./env");
const db = require("./database");

app.db = db;

module.exports = app;

require("./contributor-1");


console.log("listening on port " + env.port);
app.listen(env.port);
