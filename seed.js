'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);

const User = require('./models/user');

async function seed() {
  const newUser = new User({
    email: 'derek.j.douglas13@gmail.com',
    timestamp: Date.now(),
    tarotToday: {
      "type": "major",
      "name_short": "ar09",
      "name": "The Hermit",
      "value": "9",
      "value_int": 9,
      "meaning_up": "Prudence, circumspection; also and especially treason, dissimulation, roguery, corruption.",
      "meaning_rev": "Concealment, disguise, policy, fear, unreasoned caution.",
      "desc": "The variation from the conventional models in this card is only that the lamp is not enveloped partially in the mantle of its bearer, who blends the idea of the Ancient of Days with the Light of the World It is a star which shines in the lantern. I have said that this is a card of attainment, and to extend this conception the figure is seen holding up his beacon on an eminence. Therefore the Hermit is not, as Court de Gebelin explained, a wise man in search of truth and justice; nor is he, as a later explanation proposes, an especial example of experience. His beacon intimates that \"where I am, you also may be.\"\nIt is further a card which is understood quite incorrectly when it is connected with the idea of occult isolation, as the protection of personal magnetism against admixture. This is one of the frivolous renderings which we owe to Éliphas Lévi. It has been adopted by the French Order of Martinism and some of us have heard a great deal of the Silent and Unknown Philosophy enveloped by his mantle from the knowledge of the profane. In true Martinism, the significance of the term Philosophe inconnu was of another order. It did not refer to the intended concealment of the Instituted Mysteries, much less of their substitutes, but--like the card itself--to the truth that the Divine Mysteries secure their own protection from those who are unprepared.",
      "image_url": 
      {
        "page": "https://commons.wikimedia.org/wiki/File:RWS_Tarot_09_Hermit.jpg",
        "src": "https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg",
        "attribution": "Pamela Colman Smith, Public domain, via Wikimedia Commons"
      },
      "drinks":
      {
        "alcoholic": "Coffee Liqueur",
        "non-alcoholic": "Coke and Drops"
      }
    },
    drinkChosen: {
      "idDrink": "12370",
      "strDrink": "Tequila Sour",
      "strDrinkAlternate": null,
      "strTags": null,
      "strVideo": null,
      "strCategory": "Ordinary Drink",
      "strIBA": null,
      "strAlcoholic": "Alcoholic",
      "strGlass": "Whiskey sour glass",
      "strInstructions": "Shake tequila, juice of lemon, and powdered sugar with ice and strain into a whiskey sour glass. Add the half-slice of lemon, top with the cherry, and serve.",
      "strInstructionsES": null,
      "strInstructionsDE": "Tequila, Zitronensaft und Puderzucker mit Eis schütteln und in ein Whiskey-Sourglas abseihen. Die halbe Zitronenscheibe dazugeben, mit der Kirsche garnieren und servieren.",
      "strInstructionsFR": null,
      "strInstructionsIT": "Shakerare la tequila, il succo di limone e lo zucchero a velo con ghiaccio e filtrare in un bicchiere da whisky sour.Aggiungere la mezza fetta di limone, guarnire con la ciliegia e servire.",
      "strInstructionsZH-HANS": null,
      "strInstructionsZH-HANT": null,
      "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/ek0mlq1504820601.jpg",
      "strIngredient1": "Tequila",
      "strIngredient2": "Lemon",
      "strIngredient3": "Powdered sugar",
      "strIngredient4": "Lemon",
      "strIngredient5": "Cherry",
      "strIngredient6": null,
      "strIngredient7": null,
      "strIngredient8": null,
      "strIngredient9": null,
      "strIngredient10": null,
      "strIngredient11": null,
      "strIngredient12": null,
      "strIngredient13": null,
      "strIngredient14": null,
      "strIngredient15": null,
      "strMeasure1": "2 oz ",
      "strMeasure2": "Juice of 1/2 ",
      "strMeasure3": "1 tsp ",
      "strMeasure4": "1/2 slice ",
      "strMeasure5": "1 ",
      "strMeasure6": null,
      "strMeasure7": null,
      "strMeasure8": null,
      "strMeasure9": null,
      "strMeasure10": null,
      "strMeasure11": null,
      "strMeasure12": null,
      "strMeasure13": null,
      "strMeasure14": null,
      "strMeasure15": null,
      "strImageSource": null,
      "strImageAttribution": null,
      "strCreativeCommonsConfirmed": "No",
      "dateModified": "2017-09-07 22:43:21"
      },
    history: [
      {
        tarotName: "The Hermit",
        drinkName: "Tequila Sour",
        timestamp: Date.now()
      }
    ]
  });
  newUser.save(function(err){
    if (err) console.error(err);
    else console.log('Saved test user');
  });
  mongoose.disconnect();
}

seed();