const express = require('express');
const router = express.Router();

router.get('/kontodetails', (req, res) => {
        res.render('kontodetails.ejs', {
            pageTitle: 'Start',
        });
});
module.exports = router;