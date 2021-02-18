var express = require('express');
var router = express.Router();
var pgp = require("pg-promise")(/*/options/*/);
var db = pgp("postgresql://postgres:postgres@127.0.0.1/buchmichl");


router.get('/login', (req, res) => {

    res.render('login.ejs', {
        pageTitle: 'Login',
    });
});

router.post('/authenticate',(req,res) => {
    db.one("SELECT passwort FROM benutzer WHERE username=$1",[req.body.name])
        .then( (data) => {
  
          if(data.passwort == req.body.passw){
              res.send({query:'ok'});
          }
          else{
              res.send({query:'nicht ok'});
          }
        })
        .catch( (error) => {
          //console.log("ERROR:", error);
          res.send({query:'nicht ok'});
        });
  
  });

router.post('/register', (req, res) => {
    
});
module.exports = router;