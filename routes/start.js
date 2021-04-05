const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.app.locals.authenticated) {
        res.render('start.ejs', {
            pageTitle: 'Start',
            username: req.app.locals.username,
            options: "<a id='konto'>Konto</a> <a id='logout'>Logout</a> ",
        });
    }
    else {
    res.render('start.ejs', {
        pageTitle: 'Start',
        username: req.app.locals.username,
        options: "<a id='login'>Login</a>",
    });
}
});
module.exports = router;

