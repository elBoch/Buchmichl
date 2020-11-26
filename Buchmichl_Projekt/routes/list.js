var express = require('express');
var router = express.Router();

router.get('/list', (req, res) => {
    res.render('list.ejs', {
        pageTitle: 'List',
    });
});
module.exports = router;