const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

const tacheRoutes = require("./routes/taches");
app.use(tacheRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "non non non" });
});

app.listen(process.env.PORT, (req, res) => {
  console.log("LETS GO BABY NEW PROJECTO TODO 2.0 WITH BIG TOKEN BITCHES");
});
