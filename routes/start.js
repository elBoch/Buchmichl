const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.app.locals.authenticated) {
        res.render('start.ejs', {
            pageTitle: 'Start',
            profil:"<a id='logout'>Logout</a>",
        });
    }
    else {
        res.render('start.ejs', {
            pageTitle: 'Start',
            profil:"<a id='login'>Login</a>",
        });
    }
});
module.exports = router;

