const express = require('express');
const router = express.Router();

router.get('/unterkunftform', (req, res) => {
        res.render('unterkunftform.ejs', {
            pageTitle: 'Start',
        });
});
module.exports = router;