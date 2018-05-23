
const express = require("express");
const Joi = require("joi");
const app = express();

app.use(express.json());
app.set('views', './views');
app.set('view engine', 'pug');

let genres = [
    {id: 1, name: 'Action'},
    {id: 2, name: 'Adventure'},
    {id: 3, name: 'Comedy'},
    {id: 4, name: 'Crime'},
    {id: 5, name: 'Drama'}
];

app.get('/', (req, res) => {
    res.render('home', {title: 'Vidly App', message: 'Welcome to advanced nodejs course.'})
});

app.get('/api/genres/', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genreId = req.params.id;
    const genre = genres.find(element => element.id === parseInt(genreId));
    if(!genre) return res.status(404).send('The given id not found.');

    res.send(genre);
});

app.post('/api/genres/', (req, res) => {
    const {error} = validateGenre(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const genre = {id: genres.length + 1, name: req.body.name};
    genres.push(genre);

    res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const genreId = req.params.id;
    const genre = genres.find(genre => genre.id === parseInt(genreId));
    if(!genre) return res.status(404).send('Genre not found with the given id.');
    genre.name = req.body.name;

    return res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('Genre not found with the given id.');

    var index = genres.indexOf(genre);
    genres.splice(index, 1);

    return res.send(genre);
});

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };

   return Joi.validate(genre, schema);
}

app.listen(3000, () => console.log('server listen to port 3000...'));