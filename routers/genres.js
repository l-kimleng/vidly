
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Genre, validate} = require('../models/genre');

router.get('/', (req, res) => {
    getGenres()
        .then(genres => res.send(genres))
        .catch(err => res.status(500).send(err));    
});

async function getGenres() {
    try{
        return await Genre.find()
                   .select({name: 1}); 
    }catch(err) {
        throw err;
    }       
}

router.get('/:id', (req, res) => {
    const genreId = req.params.id;
    
    getGenre(genreId)
        .then(genre => {
            if(!genre) return res.status(404).send('The given id not found.');
            res.send(genre)        
        })
        .catch(err => res.status(500).send(err));
});

async function getGenre(id) {
    try{
        return await Genre.findById(id)
                        .select({name: 1});
    }catch(err) {
        throw err;
    }
}

router.post('/', (req, res) => {
    const {error} = validate(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    createGenre(req.body.name)
        .then(genre => res.send(genre))
        .catch(err => res.status(500).send(err));   
});

async function createGenre(name) {
    try{
        let genre = new Genre({name: name});
        return await genre.save();
    }catch(err) {
        throw err;
    }    
}

router.put('/:id', (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const genreId = req.params.id;
    updateGenre(genreId, req.body.name)
        .then(newGenre => {
            if(!newGenre) return res.status(404).send('Genre not found with the given id.');
            res.send(newGenre);
        })
        .catch(err => res.status(500).send(err));
});

async function updateGenre(id, name) {
    try{
        return await Genre.findByIdAndUpdate(id, {
            name: name
        }, {new: true});     
    }catch(err) {
        throw err;
    }
}

router.delete('/:id', (req, res) => {
    const genreId = req.params.id;

    deleteGenre(genreId)
        .then(genre => {
            if(!genre) return res.status(404).send('Genre not found with the given id.');
            res.send(genre);
        })
        .catch(err => res.status(500).send(err)); 
});

async function deleteGenre(id) {
    try{
        return await Genre.findByIdAndRemove(id);
    }catch(err) {
        throw err;
    }
}

module.exports = router;