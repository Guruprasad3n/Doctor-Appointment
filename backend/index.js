const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

// dotenv config
dotenv.config();
// dbConnect()

// mongo Connectin``
const connectDB = require("./config/db");
connectDB();
// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.status(200).send("You are in Home Page");
});

// listen Port
const Port = process.env.PORT;

// listen
app.listen(Port, (req, res) => {
  console.log(`Server Runnning in http://localhost:${Port}`);
});
