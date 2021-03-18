const express = require('express');
const router = express.Router();
const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgres://kkrxjxdhduntnc:ae8b79d1199e4142793100aebdb647e15711b5e0e2bca190b7e8875b8f64590b@ec2-54-72-155-238.eu-west-1.compute.amazonaws.com:5432/d9k5kpg39ia48r',
  ssl: {
    rejectUnauthorized: false
  }
});
  client.on("error",(er) => console.log);
  client.connect();

//var db = pgp("postgresql://postgres://kkrxjxdhduntnc:ae8b79d1199e4142793100aebdb647e15711b5e0e2bca190b7e8875b8f64590b@ec2-54-72-155-238.eu-west-1.compute.amazonaws.com:5432/d9k5kpg39ia48r");
const passwordHash = require('password-hash');

router.get('/login', (req, res) => {

  res.render('login.ejs', {
    pageTitle: 'Login',
  });
});

router.post('/authenticate', (req, res) => {
  //console.log(req.body.name);
  client.query("SELECT passwort FROM benutzer WHERE username=$1", [req.body.name])
    .then((data) => {
      if (passwordHash.verify(req.body.passw, data[0].passwort)) {
        res.send({ query: 'ok' });
      }
      else {
        res.send({ query: 'nicht ok' });
      }
    })
    .catch((error) => {
      res.send({ query: 'nicht ok' });
    });

});

router.post('/register', (req, res) => {
  let hashedPassword = passwordHash.generate(req.body.passw);
  client.query('SELECT COUNT(*) FROM benutzer WHERE username = $1', [req.body.name])
    .then((data) => {
      if (data[0].count != 0) {
        res.send("username bereits vergeben");
      }
      else {
        client.query('INSERT INTO benutzer (username, passwort, vorname, nachname, geburtsdatum, addresse, email, admin) VALUES($1,$2, \'vorname\',\'nachname\',\'01.01.2020\',\'addresse\',$3,\'false\')',
          [req.body.name, hashedPassword, req.body.email])
          .then((data) => {
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
module.exports.client = client;