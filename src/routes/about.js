const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/', async (req, res) => {
    const about = await pool.query('SELECT * FROM about');
    res.render('about/about', { about });
})

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const about = await pool.query('SELECT * FROM about WHERE ID=?', [id]);
    res.render('about/edit', { about: about[0] });
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const newAbout = {
        title,
        description
    };
    await pool.query('UPDATE about set ? WHERE id=?', [newAbout, id]);
    req.flash('success', 'About Updated Succesfully');
    res.redirect('/about');
});

module.exports = router;