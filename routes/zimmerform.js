const express = require('express');
const router = express.Router();

router.get('/zimmerform', (req, res) => {
        res.render('zimmerform.ejs', {
            pageTitle: 'Start',
        });
});
module.exports = router;