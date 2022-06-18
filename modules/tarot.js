'use strict';
const axios = require('axios');
const CardData = require('../card_data.json');
const Tarot = {};

Tarot.draw = async (request, response, next) => {
  try {
    let major = CardData.cards.filter(value => value.type === 'major');
    let drawnCard = major[Math.floor(Math.random() * major.length)];
    if (drawnCard.name === 'Wheel Of Fortune') {
      //use ternary for alcohol/non-alcoholic
      let dbTarget = request.body.drinkTarget === 'alcoholic' ? 'Alcoholic' : 'Non-Alcoholic';
      
      let filteredDrinks = await axios.get(`${process.env.COCKTAILDB_URL}filter.php?a=${dbTarget}`);
      let drink = filteredDrinks[Math.floor(Math.random() * filteredDrinks.length)];  
      response.status(200).send(drawnCard, drink);
      //choose random drink ingredient
      //Pass alcohol/non-a in request

    } else if (drawnCard.name === 'Death') {
      let dbTarget = request.body.drinkTarget === 'alcoholic' ? 'Alcoholic' : 'Non-Alcoholic';
      
      let filteredDrinks = await axios.get(`${process.env.COCKTAILDB_URL}filter.php?a=${dbTarget}`);
      let drink = filteredDrinks[Math.floor(Math.random() * filteredDrinks.length)];  
      response.status(200).send(drawnCard, drink);
      //use ternary for alcohol/non-alcoholic
      //search user history for drink never tried
      //if fails, choose random drink ingredient
    } else {
      //use ternary for alcohol/non-alcoholic
      let drinkTarget = request.body.drinkTarget === 'alcoholic' ? drawnCard.drinks.alcoholic : drawnCard.drinks['non-alcoholic'];
      //call drink api
      //Remove async functionality?
      let drink = await axios.get(`${process.env.COCKTAILDB_URL}search.php?s=${drinkTarget}`);
      //May need to package vars in object
      response.status(200).send(drawnCard, drink);
    }
    response.status(200).send(drawnCard);
  } catch (error) {
    next(error.message);
  }
};

// Tarot.wheel = (request, response, next) => {
//   try {
//     let major = CardData.filter(value => value.type === 'major');
//   } catch (error) {
//     next(error.message);
//   }
// };

// Tarot.death = (request, response, next) => {
//   try {

//   } catch (error) {
//     next(error.message);
//   }
// };

module.exports = Tarot;