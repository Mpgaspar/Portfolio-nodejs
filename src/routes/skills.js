const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('skills/add');
});

router.post('/add', async (req, res) => {
    const { title, description } = req.body;
    const newSkill = {
        title,
        description
    };
    await pool.query('INSERT INTO skills set ?', [newSkill]);
    req.flash('success', 'Skill Saved Succesfully');
    res.redirect('/skills');
});

router.get('/', async (req, res) => {
    const skills = await pool.query('SELECT * FROM skills');
    res.render('skills/list', { skills });
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM skills WHERE ID=?', [id]);
    req.flash('success', 'Skill Removed Succesfully');
    res.redirect('/skills');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const skill = await pool.query('SELECT * FROM skills WHERE ID=?', [id]);
    res.render('skills/edit', { skill: skill[0] });
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const newSkill = {
        title,
        description
    };
    await pool.query('UPDATE skills set ? WHERE id=?', [newSkill, id]);
    req.flash('success', 'Skill Updated Succesfully');
    res.redirect('/skills');
});

module.exports = router;