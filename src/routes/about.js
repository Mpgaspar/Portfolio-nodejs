const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('about/about');
});

router.get('/edit', (req, res) => {
    
    res.render('about/edit');
});

/*router.get('/edit', async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE ID=?', [id]);
    res.render('../views/links/edit', { links: links[0] });
})

router.post('/edit', async (req, res) => {
    const about = req.body;
    
    console.log(about);
    res.redirect('/about');
})*/

module.exports = router;