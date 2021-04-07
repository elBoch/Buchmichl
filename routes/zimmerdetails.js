const express = require('express');
const router = express.Router();
let checkAuthentication = require("./api").checkAuthentication;
const buildString = require('../routes/unterkunftdetails').buildString;
let unterkunft;

router.get('/zimmerdetails', async(req, res) => {
    const unterkunftData = await client.query(
                "SELECT z.preis, z.anzahlpersonen, za.zimmerartname, v.verpflegungname, u.unterkunftname, u.unterkunftstext, zas.ausstattungsname "+
                "FROM unterkunft u INNER JOIN zimmerartinunterkunft ziu ON u.unterkunftid = ziu.unterkunftid "+
                                  "INNER JOIN zimmer z ON ziu.zimmerartid = z.zimmerartid AND ziu.unterkunftid = z.unterkunftid " +
                                  "INNER JOIN zimmerart za ON ziu.zimmerartid = za.zimmerartid " + 
                                  "INNER JOIN zimmerverpflegunginunterkunft zvi ON zvi.unterkunftid = ziu.unterkunftid " +
                                  "INNER JOIN verpflegung v ON v.verpflegungid = zvi.verpflegungid " +
                                  "INNER JOIN zimmerausstattunginunterkunft zaiu ON zaiu.zimmerartid = ziu.zimmerartid AND zaiu.unterkunftid = ziu.unterkunftid " +
                                  "INNER JOIN zimmerausstattung zas ON zas.ausstattungid = zaiu.ausstattungid " +
                "WHERE u.unterkunftname = $1; ",
                [unterkunft]
      );
    let check = await checkAuthentication(req,res);
    if (check!="") {
        res.render('zimmerdetails.ejs', {
            username: check,
            options: "<a id='konto'>Konto</a> <a id='logout'>Logout</a> ",
        });
    }
    else {
    res.render('zimmerdetails.ejs', {
        username: check,
        options: "<a id='login'>Login</a>",
    });
}
});

router.post("/zimmerdetails", (req, res) => {
    unterkunft = req.body.unterkunft;
  });
module.exports = router;

