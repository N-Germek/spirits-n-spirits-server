'use strict';
const axios = require('axios');
const CardData = require('../card_data.json');

const Tarot = {};
let apiURL;

Tarot.draw = async (request, response, next) => {
  try {
    let major = CardData.cards.filter(value => value.type === 'major');
    let drawnCard = major[Math.floor(Math.random() * major.length)];
    console.log(drawnCard.name);
    if (drawnCard.name === 'Wheel Of Fortune') {
      //use ternary for alcohol/non-alcoholic
      let dbTarget = request.params.drinkTarget === 'alcoholic' ? 'Alcoholic' : 'Non_Alcoholic';
      apiURL = `${process.env.COCKTAILDB_URL}filter.php?a=${encodeURIComponent(dbTarget)}`;
      let filteredDrinks = await axios.get(apiURL);
      let banana = filteredDrinks.data.drinks;
      console.log(banana, 'Wheel');
      let drinkTarget = banana[Math.floor(Math.random() * banana.length)].strDrink;
      const apiURL2 = `${process.env.COCKTAILDB_URL}search.php?s=${encodeURIComponent(drinkTarget)}`;
      let drink = await axios.get(apiURL2);
      response.status(200).send({drawnCard: drawnCard, drinkChosen: drink.data.drinks});
      //choose random drink ingredient
      //Pass alcohol/non-a in request

    } else if (drawnCard.name === 'Death') {
      let dbTarget = request.body.drinkTarget === 'alcoholic' ? 'Alcoholic' : 'Non_Alcoholic';
      apiURL = `${process.env.COCKTAILDB_URL}filter.php?a=${encodeURIComponent(dbTarget)}`;
      let filteredDrinks = await axios.get(apiURL);
      let banana = filteredDrinks.data.drinks;
      let drinkTarget = banana[Math.floor(Math.random() * banana.length)].strDrink;
      const apiURL2 = `${process.env.COCKTAILDB_URL}search.php?s=${encodeURIComponent(drinkTarget)}`;
      let drink = await axios.get(apiURL2);
      response.status(200).send({drawnCard: drawnCard, drinkChosen: drink.data.drinks});
      //use ternary for alcohol/non-alcoholic
      //search user history for drink never tried
      //if fails, choose random drink ingredient
    } else {
      //use ternary for alcohol/non-alcoholic
      let drinkTarget = request.body.drinkTarget === 'alcoholic' ? drawnCard.drinks.alcoholic : drawnCard.drinks['non-alcoholic'];
      //call drink api
      //Remove async functionality?
      apiURL = `${process.env.COCKTAILDB_URL}search.php?s=${encodeURIComponent(drinkTarget)}`;
      console.log(apiURL);
      let drink = await axios.get(apiURL);
      console.log(drink.data, 'Else');
      //May need to package vars in object
      //
      response.status(200).send({drawnCard: drawnCard, drinkChosen: drink.data});
    }
   // response.status(200).send(drawnCard);
  } catch (error) {
    console.log(error, 'Error');
    next(error.message);
  }
};
// TODO: CLEAN ME OH GOD
module.exports = Tarot;
