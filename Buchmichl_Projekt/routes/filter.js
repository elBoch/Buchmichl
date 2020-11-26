var express = require('express');
var router = express.Router();

router.get('/filter', (req, res) => {
    res.render('filter.ejs', {
        pageTitle: 'Filter',
    });
});
module.exports = router;