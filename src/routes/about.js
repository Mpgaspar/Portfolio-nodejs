const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/about', (req, res) => {
    res.render('about/about');
});

module.exports = router;