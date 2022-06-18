'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);

const User = require('./models/user');

async function clear() {
  try {
    await User.deleteMany({});
    console.log('Users Deleted!');
  } catch(error) {
    console.error('Something went wrong when deleting', error);
  } finally {
    mongoose.disconnect();
  }
}
clear();
