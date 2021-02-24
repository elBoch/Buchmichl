var express = require('express');
var router = express.Router();
var db1 = require('./login').db;


router.get('/filter', (req, res) => {
    
    res.render('filter.ejs', {
        pageTitle: 'Filter',
        data:'nothing'
    });
});

router.post('/getUnterkunftList', (req, res) => {
    //console.log(req.body);
      db1.query('SELECT * FROM unterkunft u INNER JOIN zimmerartinunterkunft zu ON u.unterkunftid=zu.unterkunftid INNER JOIN zimmer z ON z.zimmerartid = zu.zimmerartid AND z.unterkunftid= zu.unterkunftid INNER JOIN unterkunftart ua ON u.unterkunftartid = ua.unterkunftartid WHERE u.sterne=$1 AND u.regionid=(SELECT regionid FROM region WHERE regionname=$2) AND z.preis BETWEEN $3 AND $4 AND z.anzahlpersonen=$5 AND ua.unterkunftartname = $6;',
      [req.body.sterne,req.body.region, req.body.preis_von, req.body.preis_bis, req.body.anz_pers, req.body.unterkunftart])
        .then( (data) => {
  
          //console.log(data);
         res.send(data);
        })
        .catch( (error) => {
          console.log("ERROR:", error);
          //console.log("jkagf");
        });
  
  });


module.exports = router;