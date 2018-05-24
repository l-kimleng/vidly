
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');
const Joi = require('joi');

const movieSchema = new mongoose.Schema({
    title: String,
    genre: {
        type: genreSchema,
        ref: 'Genre'
    },
    numberInStock: Number,
    dailyRentalRate: Number
});

const Movie = mongoose.model('movie', movieSchema);

function validate(movie) {
    const schema = {
        title: Joi.string().required(),
        numberInStock: Joi.number().default(0).min(0),
        dailyRentalRate: Joi.number().default(0).min(0),
        genreId: Joi.objectId().required()
    };
    return Joi.validate(movie, schema);
}

module.exports.Movie = Movie;
module.exports.validate = validate;