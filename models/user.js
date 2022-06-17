'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  timestamp: Number,
  tarotToday: Object,
  drinkChosen: Object,
  history: Array
});

const User = mongoose.model('User', userSchema);

module.exports = User;
