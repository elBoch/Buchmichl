const express = require('express');
const router = express.Router();
const client = require("./api").client;
let checkAuthentication = require("./api").checkAuthentication;

router.get('/inseratelist', async (req, res) => {
    let check = await checkAuthentication(req, res);

    if (check != "") {
        //inserate holen
        res.render('inseratelist.ejs', {
            pageTitle: 'Start',
            username: check,
            options:"<a id='konto'>Konto</a> <a id='logout'>Logout</a> ",
        });
    }
    else{
        res.render('start.ejs', {
            pageTitle: 'Start',
            username: check,
            options: "<a id='login'>Login</a>",
        });
    }
});

router.get('/getInserate', async (req, res) => {
    let check = await checkAuthentication(req, res);
    let data = await getUnterkunftMitZimmer(check);
    res.send(Array.from(data));
});


async function getUnterkunftMitZimmer(username){
    let unterkunftMap = new Map();
    let unterkunft = await client.query(
        "SELECT u.unterkunftid, u.unterkunftname, ua.unterkunftartname, u.sterne " +
        "FROM unterkunft u INNER JOIN unterkunftart ua ON u.unterkunftartid = ua.unterkunftartid "+
                           "INNER JOIN anbieter an ON u.userid = an.userid "+
                           "INNER JOIN benutzer us ON an.userid = us.userid "+
        "WHERE us.username = $1;",[username]
      );
    for(let i=0; i<unterkunft.rows.length; i++){
        let zimmer = await client.query(
            "SELECT z.zimmerid, z.zimmername, z.preis, z.anzahlpersonen, za.zimmerartname " +
            "FROM zimmer z INNER JOIN zimmerartinunterkunft zaiu ON z.zimmerartid = zaiu.zimmerartid AND z.unterkunftid = zaiu.unterkunftid "+
                          "INNER JOIN unterkunft u ON zaiu.unterkunftid = u.unterkunftid "+
                          "INNER JOIN zimmerart za ON zaiu.zimmerartid = za.zimmerartid "+
            "WHERE u.unterkunftname = $1;",[unterkunft.rows[i].unterkunftname]
          );
        
        unterkunftMap.set(unterkunft.rows[i],zimmer.rows);
    }
    
    return unterkunftMap;

}
module.exports = router;