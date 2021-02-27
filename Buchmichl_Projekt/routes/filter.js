var express = require('express');
var router = express.Router();
var db1 = require('./login').db;
var filterStatement="";


router.get('/filter', (req, res) => {
    
    res.render('filter.ejs', {
        pageTitle: 'Filter',
        data:'nothing'
    });
});

router.post('/getUnterkunftList', (req, res) => {
    //console.log(req.body);
    buildStatement(req);
    //console.log(filterStatement);
      db1.query(filterStatement)
        .then( (data) => {
  
          //console.log(data);
         res.send(data);
         filterStatement="";
        })
        .catch( (error) => {
          console.log("ERROR:", error);
          //console.log("jkagf");
        });
  
  });


  
  function buildStatement(req){
    filterStatement +=" SELECT * "+
                      "FROM unterkunft u INNER JOIN zimmerartinunterkunft zu ON u.unterkunftid=zu.unterkunftid "+
                                        "INNER JOIN zimmer z ON z.zimmerartid = zu.zimmerartid AND z.unterkunftid= zu.unterkunftid "+ 
                                        "INNER JOIN unterkunftart ua ON u.unterkunftartid = ua.unterkunftartid "+
                      "WHERE z.preis BETWEEN "+req.body.preis_von+" AND ";

    if(req.body.preis_bis !=""){
      filterStatement+=req.body.preis_bis;
    }
    else{
      filterStatement+="1000000";
    }
    if(req.body.sterne!="Egal"){
      filterStatement+=" AND u.sterne="+req.body.sterne;
    }
    if(req.body.region!=""){
      filterStatement+=" AND u.regionid=(SELECT regionid FROM region WHERE regionname='"+req.body.region+"')";
    }
    if(req.body.anz_pers!=""){
      filterStatement+=" AND z.anzahlpersonen="+req.body.anz_pers;
    }
    if(req.body.unterkunftart!="Egal"){
      filterStatement+=" AND ua.unterkunftartname = '"+req.body.unterkunftart+"'";
    }

    filterStatement+=" ORDER BY u.unterkunftid;";

  }


module.exports = router;