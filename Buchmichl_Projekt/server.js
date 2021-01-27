const express = require('express');

const port = process.env.PORT || 3000;
var app = express();


app.set('view engine', 'ejs');

app.use('/public',express.static(__dirname + '/public'));

app.use(express.static('public'));

app.use(require('./routes/start'));
app.use(require('./routes/login'));
app.use(require('./routes/list'));
app.use(require('./routes/filter'));
app.use(require('./routes/ansicht'));

var pgp = require("pg-promise")(/*/options/*/);
var db = pgp("postgresql://postgres:postgres@127.0.0.1/buchmichl");
db.one("SELECT * FROM benutzer WHERE userid=1")
    .then(function (data) {
        console.log("DATA:", data.username);
    })
    .catch(function (error) {
        console.log("ERROR:", error);
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

module.exports =app;