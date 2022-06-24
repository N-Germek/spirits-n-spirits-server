# Spirits N Spirits Server

## Versions

Version 1.0.0
Version 1.0.1
Version 1.0.2
Version 1.0.3
Version 1.0.4

## Team: Derek Douglas, Natalija Germek, Zayah Lang

## Description

Welcome to Spirits & Spirits the ultimate site to start or end your day. Ever wonder what your tarot says? Join us in pulling a tarot card for your daily reading. A drink recommendation is also included and all you will need to do is decide whether it will be an alcoholic or not.

## Problem Domain

Do you question if the universe is trying to tell you something? Do you want to take some time with a drink and mull it over? Welcome to our App.

A leisure oriented application meant for a user to perform a simple tarot reading and self reflect upon it alongside drinks for the day.

Stretch goals are to attach it to music recommendations based on the tarot card drawn name.

## Tools Used

[VS Code](https://code.visualstudio.com/)
[Tarot](https://github.com/ekelen/tarot-api)
[Cocktail DB](https://www.thecocktaildb.com/api.php)
[Trello](https://trello.com/b/BlU3ilFX/spirits-spirits)
[Miro](https://miro.com/welcomeonboard/ZmNzNGxZOW9jaHFXZm9NN3BDV0dUaU52VUJQNnhKcjVJZFhPY21RNW1YcWZxVVhVYnFZS2xybVdUYXpSMTBXbHwzNDU4NzY0NTI1MDk3NTM5NjAw?share_link_id=983273918266)

## Quick Start

 Step one: Log into your profile to start your reading.
 Step two: Select if you are looking for an alcoholic drink or not (be ready to get tipsy if you don't make a selection).
 Step three: Draw your card for the day.
 Step four: Read your card and get your drink recommendation.
 If you want more information, please feel free to read the description of your tarot card and the recipe of your drink.

## API Endpoints

/draw
Draw requires a query of alcoholic or non-alcoholic
/history
/delete

## Schemas

`{
email: test@test.com,
timestamp:123456,
tarotToday: {}, //tarot data from API
drinkChosen: {}, //drink data from API
history: [
  {
  tarotName: The Lovers, //Extract just names for storage & retrieval
  drinkName: Sex on the Beach,
  timestamp: 12345 // Save timestamp for history display later
  }
 ]
}`
