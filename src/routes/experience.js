const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/experience', (req, res) => {
    res.render('experience/experience');
});

module.exports = router;