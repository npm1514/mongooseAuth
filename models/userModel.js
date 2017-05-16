const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
var car = require('./carSchema');


var userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: Number,
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  isCool: Boolean,
  car: car,
  moviesPosted: [{type: mongoose.Schema.Types.ObjectId, ref: "movies"}]
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('users', userSchema);
