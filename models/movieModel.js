const mongoose = require('mongoose');

var movieSchema = new mongoose.Schema({
  name: {type: String, required: true},
  year: Number,
  type: String,
  lengthInMinutes: Number,
  actors: [String]
});

module.exports = mongoose.model('movies', movieSchema);
