const mongoose = require("mongoose");

const Taches = mongoose.model("Taches", {
  name: String,
});

module.exports = Taches;
