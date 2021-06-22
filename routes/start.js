/**
 * Startseite zurückschicken
 */

const express = require('express');
const router = express.Router();
let checkAuthentication = require("./api").checkAuthentication;

router.get('/', async(req, res) => {
    let check = await checkAuthentication(req,res);
    if (check!="") {
        res.render('start.ejs', {
            pageTitle: 'Start',
            username: check,
            options: "<a id='konto'>Konto</a> <a id='logout'>Logout</a> ",
        });
    }
    else {
    res.render('start.ejs', {
        pageTitle: 'Start',
        username: check,
        options: "<a id='login'>Login</a>",
    });
}
});
module.exports = router;

