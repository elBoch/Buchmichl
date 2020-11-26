var express = require('express');
var router = express.Router();

router.get('/ansicht', (req, res) => {
    res.render('ansicht.ejs', {
        pageTitle: 'Ansicht',
    });
});
module.exports = router;