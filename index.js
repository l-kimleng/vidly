
const express = require("express");
const app = express();
const home = require('./routers/home');
const genres = require('./routers/genres');
const customers = require('./routers/customers');
const movies = require('./routers/movies');
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log("Connected to mongodb."))
    .catch((err) => console.log("Something went worong", err));

app.use(express.json());
app.use('/api/genres/', genres);
app.use('/api/customers/', customers);
app.use('/api/movies/', movies);
app.use('/', home);

app.set('views', './views');
app.set('view engine', 'pug');

app.listen(3000, () => console.log('server listen to port 3000...'));