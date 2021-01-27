var express = require('express');
var router = express.Router();
var pgp = require("pg-promise")(/*/options/*/);
var db = pgp("postgresql://postgres:postgres@127.0.0.1/buchmichl");


router.get('/filter', (req, res) => {
    
    res.render('filter.ejs', {
        pageTitle: 'Filter',
    });
});


router.post('/authenticate',(req,res)=>{
  db.one("SELECT passwort FROM benutzer WHERE username=$1",[req.body.name])
      .then(function (data) {

        if(data.passwort== req.body.passw){
            res.send({query:'ok'});
        }
        else{
            res.send({query:'nicht ok'});
        }
      })
      .catch(function (error) {
        console.log("ERROR:", error);
        alert("Falscher Username oder Passwort!");
      });

});

module.exports = router;