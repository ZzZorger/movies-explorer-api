const mongoose = require('mongoose');

const emailRegexp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    match: emailRegexp,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('user', userSchema);
