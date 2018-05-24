
const express = require("express");
const app = express();
const home = require('./routers/home');
const genres = require('./routers/genres');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/movies')
    .then(() => console.log("Connect to mongodb."))
    .catch((err) => console.log("Something went worong", err));

app.use(express.json());
app.use('/api/genres/', genres);
app.use('/', home);

app.set('views', './views');
app.set('view engine', 'pug');

app.listen(3000, () => console.log('server listen to port 3000...'));