const express = require('express');
const router = express.Router();

router.get('/konto', (req, res) => {
        res.render('kontoansicht.ejs', {
            pageTitle: 'Start',
        });
});
module.exports = router;