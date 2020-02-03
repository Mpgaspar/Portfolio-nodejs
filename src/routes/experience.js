const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('experience/add');
});

router.post('/add', async (req, res) => {
    const { title, description } = req.body;
    const newExperience = {
        title,
        description
    };
    await pool.query('INSERT INTO experience set ?', [newExperience]);
    req.flash('success', 'Experience Saved Succesfully');
    res.redirect('/experience');
});

router.get('/', async (req, res) => {
    const experience = await pool.query('SELECT * FROM experience');
    res.render('experience/list', { experience });
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM experience WHERE ID=?', [id]);
    req.flash('success', 'Experience Removed Succesfully');
    res.redirect('/experience');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const experience = await pool.query('SELECT * FROM experience WHERE ID=?', [id]);
    res.render('experience/edit', { experience: experience[0] });
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const newExperience = {
        title,
        description
    };
    await pool.query('UPDATE experience set ? WHERE id=?', [newExperience, id]);
    req.flash('success', 'Experience Updated Succesfully');
    res.redirect('/experience');
});

module.exports = router;