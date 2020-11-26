var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('start.ejs', {
        pageTitle: 'Start',
    });
});
module.exports = router;
    
