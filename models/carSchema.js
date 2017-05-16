const mongoose = require('mongoose');

var carSchema = mongoose.Schema({
  name: String,
  make: String,
  model: String,
  year: Number,
  color: String
});

module.exports = ('car', carSchema);
