'use strict';
const User = require('../models/user.js');
const Handler = {};

Handler.addUser = async (request, response, next) => {
  try {
    response.status(200).json(await new User(request.body).save());
  } catch (error) { next(error.message) }
}

// client needs to getUser on load and store user _id in state for later calls

Handler.getUser = async (request, response, next) => {
  try {
    response.status(200).json(await User.findOne({ email: request.user.email, _id: request.params.id }));
  } catch (error) { next(error.message) }
}

Handler.deleteUser = async (request, response, next) => {
  const user = await User.findOne({ email: request.user.email, _id: request.params.id });
  try {
    if (!user) response.status(400).send('Unable to delete user');
    else {
      await User.findByIdAndDelete(request.params.id);
      response.status(204).send('Deleted');
    }
  } catch (error) { next(error.message) }
}

Handler.updateUser = async (request, response, next) => {
  try {
    const user = await User.findOne({ email: request.user.email, _id: request.params.id });
    if (!user) response.status(400).send('Unable to find user');
    else {
      const history = user.history;
      history.push({tarotName: user.tarotToday.name, drinkName: user.drinkChosen.strDrink, timestamp: user.timestamp});
      // requestbody should include the new tarot and drink objects as tarotObject and drinkObject
      response.status(200).send(await User.findByIdAndUpdate(request.params.id, { tarotToday: request.body.tarotObject, drinkChosen: request.body.drinkObject, timestamp: Date.now(), history: history}, {new: true,  overwrite: true}));
    }
    // pull down user data, push timestamp, tarot and drink names to history array as object, then update tarot and drink today to new with new timestamp
  } catch (error) { next(error.message) }
}

module.exports = Handler;