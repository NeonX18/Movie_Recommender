const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({}, { strict: false });

module.exports =
  mongoose.models?.Movies || mongoose.model("Movies", movieSchema, "movies");
