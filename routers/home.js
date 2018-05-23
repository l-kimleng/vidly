
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home', {title: 'Vidly App', message: 'Welcome to advanced nodejs course.'})
});

module.exports = router;