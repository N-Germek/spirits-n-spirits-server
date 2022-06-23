'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const verifyUser = require('./auth.js');
const Handler = require('./modules/handler.js');

const app = express();
app.use(cors());
app.use(express.json());
// app.use(verifyUser);
app.use((req, res, next) => {
  console.log(new Date(), req.url);
  next();
})
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Mongoose is connected'));

const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => response.send('test request received'));
app.get('/history', Handler.getUser);
app.post('/history', Handler.addUser);
app.delete('/history/:id', Handler.deleteUser);
app.put('/history/:id', Handler.updateUser);

app.get('/draw', Handler.draw);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
