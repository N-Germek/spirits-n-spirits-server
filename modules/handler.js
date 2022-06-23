'use strict';
const User = require('../models/user.js');
const Handler = {};
const axios = require('axios');
const CardData = require('../card_data.json');

// Handler.addUser = async (request, response, next) => {
//   try {
//     response.status(200).json(await new User(request.body).save());
//   } catch (error) { next(error.message); }
// };

// // client needs to getUser on load and store user _id in state for later calls

// Handler.getUser = async (request, response, next) => {
//   try {
//     response.status(200).json(await User.findOne({ email: request.user.email, _id: request.params.id }));
//   } catch (error) { next(error.message); }
// };

Handler.deleteUser = async (request, response, next) => {
  const user = await User.findOne({ email: request.user.email });
  try {
    if (!user) response.status(400).send('Unable to delete user');
    else {
      await User.findByIdAndDelete(user._id);
      response.status(204).send('Deleted');
    }
  } catch (error) { next(error.message); }
};

// Handler.updateUser = async (request, response, next) => {
//   try {
//     const user = await User.findOne({ email: request.user.email, _id: request.params.id });
//     if (!user) response.status(400).send('Unable to find user');
//     else {
//       const history = user.history;
//       history.push({ tarotName: user.tarotToday.name, drinkName: user.drinkChosen.strDrink, timestamp: user.timestamp });
//       // requestbody should include the new tarot and drink objects as tarotObject and drinkObject
//       response.status(200).send(await User.findByIdAndUpdate(request.params.id, { tarotToday: request.body.tarotObject, drinkChosen: request.body.drinkObject, timestamp: Date.now(), history: history }, { new: true, overwrite: true }));
//     }
//     // pull down user data, push timestamp, tarot and drink names to history array as object, then update tarot and drink today to new with new timestamp
//   } catch (error) { next(error.message); }
// };

// Handler.draw = async (request, response, next) => {
//   let apiURL;
//   console.log(request)
//   try {
//     let major = CardData.cards.filter(value => value.type === 'major');
//     let drawnCard = major[Math.floor(Math.random() * major.length)];
//     console.log(drawnCard.name);
//     if (drawnCard.name === 'Wheel Of Fortune') {
//       //use ternary for alcohol/non-alcoholic
//       let dbTarget = request.query.drinkTarget === 'alcoholic' ? 'Alcoholic' : 'Non_Alcoholic';
//       apiURL = `${process.env.COCKTAILDB_URL}filter.php?a=${encodeURIComponent(dbTarget)}`;
//       let filteredDrinks = await axios.get(apiURL);
//       let banana = filteredDrinks.data.drinks;
//       let drinkTarget = banana[Math.floor(Math.random() * banana.length)].strDrink;
//       const apiURL2 = `${process.env.COCKTAILDB_URL}search.php?s=${encodeURIComponent(drinkTarget)}`;
//       let drink = await axios.get(apiURL2);
//       response.status(200).send({drawnCard: drawnCard, drinkChosen: drink.data.drinks});
//       //choose random drink ingredient
//       //Pass alcohol/non-a in request

//     } else if (drawnCard.name === 'Death') {
//       let dbTarget = request.query.drinkTarget === 'alcoholic' ? 'Alcoholic' : 'Non_Alcoholic';
//       apiURL = `${process.env.COCKTAILDB_URL}filter.php?a=${encodeURIComponent(dbTarget)}`;
//       let filteredDrinks = await axios.get(apiURL);
//       let banana = filteredDrinks.data.drinks;
//       let drinkTarget = banana[Math.floor(Math.random() * banana.length)].strDrink;
//       const apiURL2 = `${process.env.COCKTAILDB_URL}search.php?s=${encodeURIComponent(drinkTarget)}`;
//       let drink = await axios.get(apiURL2);
//       response.status(200).send({drawnCard: drawnCard, drinkChosen: drink.data.drinks});
//       //use ternary for alcohol/non-alcoholic
//       //search user history for drink never tried
//       //if fails, choose random drink ingredient
//     } else {
//       //use ternary for alcohol/non-alcoholic
//       console.log(request.query.drinkTarget, 'query');
//       let drinkTarget = request.query.drinkTarget === 'alcoholic' ? drawnCard.drinks.alcoholic : drawnCard.drinks['non-alcoholic'];
//       //call drink api
//       //Remove async functionality?
//       apiURL = `${process.env.COCKTAILDB_URL}search.php?s=${encodeURIComponent(drinkTarget)}`;
//       let drink = await axios.get(apiURL);
//       //May need to package vars in object
//       //
//       response.status(200).send({drawnCard: drawnCard, drinkChosen: drink.data});
//     }
//    // response.status(200).send(drawnCard);
//   } catch (error) {
//     console.log(error, 'Error');
//     next(error.message);
//   }
// };// TODO: CLEAN ME OH GOD

Handler.process = async (request, response, next) => {
  //get call, compare sender email to DB emails. If there is an email, check for its cache. If cache has current timestamp, return that data. If cache is expired, run Handler.draw. If there is not email, create user, run this.draw
  const userCheck = await User.findOne({ email: request.user.email });
  console.log(userCheck, 'user check');
  let gatheredData;
  if (userCheck) {
    // successful user found
    if (userCheck.timestamp >= Date.now() - 86400000) { // is data cache less than a day old?
      // return cache
      const responseObject = { tarotToday: userCheck.tarotToday, drinkChosen: userCheck.drinkChosen };
      response.status(200).send(responseObject);
    } else {
      gatheredData = await Handler.draw(request, response, next);
      const history = userCheck.history;
      history.push({ tarotName: userCheck.tarotToday.name, drinkName: userCheck.drinkChosen.strDrink, timestamp: userCheck.timestamp });
      await User.findByIdAndUpdate(userCheck._id, { email: request.user.email, tarotToday: gatheredData.tarotToday, drinkChosen: gatheredData.drinkChosen, timestamp: Date.now(), history: history }, { new: true, overwrite: true });
      console.log(gatheredData);
      response.status(200).send(gatheredData);
      // store data then gather and return new data
    }
  } else {
    gatheredData = await Handler.draw(request, response, next);
    // create user
    await new User({ email: request.user.email, tarotToday: gatheredData.tarotToday, drinkChosen: gatheredData.drinkChosen, timestamp: Date.now(), history: [] }).save();
    console.log(gatheredData);
    response.status(200).send(gatheredData);
  }
}

Handler.randomDraw = async (request, response, next, drawnCard) => {
  let dbTarget = request.query.drinkTarget === 'alcoholic' ? 'Alcoholic' : 'Non_Alcoholic';
  const filterURL = `${process.env.COCKTAILDB_URL}filter.php?a=${encodeURIComponent(dbTarget)}`; // determines which filter we're using
  let filteredDrinks = await axios.get(filterURL);
  let drinkArray = filteredDrinks.data.drinks;
  let drinkTarget = drinkArray[Math.floor(Math.random() * drinkArray.length)].strDrink; // selects a random drink from our filter to query more data for
  const searchURL = `${process.env.COCKTAILDB_URL}search.php?s=${encodeURIComponent(drinkTarget)}`;
  let drink = await axios.get(searchURL);
  return { tarotToday: drawnCard, drinkChosen: drink.data.drinks[0] }; // returns user's new data for parent function
}

Handler.elseDraw = async (request, response, next, drawnCard) => {
  let drinkTarget = request.query.drinkTarget === 'alcoholic' ? drawnCard.drinks.alcoholic : drawnCard.drinks['non-alcoholic'];
  const searchURL = `${process.env.COCKTAILDB_URL}search.php?s=${encodeURIComponent(drinkTarget)}`;
  let drink = await axios.get(searchURL);
  return { tarotToday: drawnCard, drinkChosen: drink.data.drinks[0] };
}

Handler.draw = async (request, response, next) => {
  let gatheredData;
  try {
    let major = CardData.cards.filter(value => value.type === 'major');
    let drawnCard = major[Math.floor(Math.random() * major.length)];
    console.log(drawnCard.name);
    if (drawnCard.name === 'Wheel Of Fortune') {
      gatheredData = await Handler.randomDraw(request, response, next, drawnCard);
      console.log('wheel worked');
    } else if (drawnCard.name === 'Death') {
      gatheredData = await Handler.randomDraw(request, response, next, drawnCard); // TODO: this should compare to user data
      console.log('death worked');
    } else {
      gatheredData = await Handler.elseDraw(request, response, next, drawnCard);
      console.log('else worked');
    }
    return gatheredData;  // returns data pool to parent function
  } catch (error) { // this might cause issues since we do not have a response here
    console.log(error, 'Error');
    next(error.message);
  }
};

Handler.history = async (request, response, next) => {
  try {
    const userCheck = await User.findOne({ email: request.user.email });
    if(userCheck) {
      response.status(200).send({ history: userCheck.history });
    } else {
      response.status(404).send('User not found');
    }
  } catch (error) {
    console.log(error, 'Error');
    next(error.message);
  }
};











module.exports = Handler;
