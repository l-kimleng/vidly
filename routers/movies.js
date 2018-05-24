
const mongoose = require('mongoose');
const {Movie, validate} = require('../models/movie');
const {Genre} = require('../models/genre');
const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    try{ 
        const movies = await Movie.find()
            .sort({title: 1});
        res.send(movies);
    }catch(err) {
        res.status(500).send(err.message);
    }    
});

router.post('/', async (req, res) => {
    try{
        const {error} = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        const newMovie = await createMovie(req.body);        
        if(!newMovie) return res.status(400).send('Unable to save new movie.');
        res.send(newMovie);
    }catch(err) {
        res.status(500).send(err.message);
    }
});

async function createMovie(movie) {
    try{
        const genre = await Genre.findById(movie.genreId);
        if(!genre) throw new Error("Not found genre with the given id.");

        const newMovie = new Movie({
            title: movie.title,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate,
            genre: {
                 _id: movie.genreId,
                 name: genre.name
            }
        });

        return newMovie.save();

    }catch(err) {
        throw err;
    }
}

module.exports = router;