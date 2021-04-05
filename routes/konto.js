const express = require('express');
const router = express.Router();

router.get('/konto', (req, res) => {
        res.render('adminPanel.ejs', {
            pageTitle: 'Start',
        });
});
module.exports = router;