var express = require('express');
var router = express.Router();
var pgp = require("pg-promise")(/*/options/*/);
var db = pgp("postgresql://postgres:postgres@127.0.0.1/buchmichl");
var passwordHash = require('password-hash');

router.get('/login', (req, res) => {

  res.render('login.ejs', {
    pageTitle: 'Login',
  });
});

router.post('/authenticate', (req, res) => {
  console.log(req.body.name);
  db.query("SELECT passwort FROM benutzer WHERE username=$1", [req.body.name])
    .then((data) => {
      //console.log(data[0].passwort);

      if (passwordHash.verify(req.body.passw, data[0].passwort)) {
        res.send({ query: 'ok' });
      }
      else {
        res.send({ query: 'nicht ok' });
      }
    })
    .catch((error) => {
      //console.log("ERROR:", error);
      res.send({ query: 'nicht ok' });
    });

});

router.post('/register', (req, res) => {
  var hashedPassword = passwordHash.generate(req.body.passw);
  db.query('SELECT COUNT(*) FROM benutzer WHERE username = $1', [req.body.name])
    .then((data) => {
      //console.log(data[0].count);
      if (data[0].count !=0) {
        res.send("username bereits vergeben");
      }
      else {
        db.query('INSERT INTO benutzer (username, passwort, vorname, nachname, geburtsdatum, addresse, email, admin) VALUES($1,$2, \'vorname\',\'nachname\',\'01.01.2020\',\'addresse\',$3,\'false\')',
          [req.body.name, hashedPassword, req.body.email])
          .then((data) => {
            //console.log("sdjfg");
            res.send('register successed');
          })
          .catch((error) => {
            console.log("ERROR:", error);
            res.send('register failed');
          });
      }
    })
    .catch((error) => {
      console.log("ERROR:", error);
      res.send('register failed');
    });


});
module.exports = router;
module.exports.db = db;