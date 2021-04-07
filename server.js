const express = require('express');

const port = process.env.PORT || 3000;
var app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const crypto = require('express-crypto');



app.set('view engine', 'ejs');

app.use('/public',express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({
    secret: "0575954a954863f4c75db1853f2feb1a",
    resave: false,
    saveUninitialized: false
}));
app.use(crypto({ secret: 'Földschneider' }, app));

app.use(express.static('public'));

app.use(require('./routes/api'));
app.use(require('./routes/start'));
app.use(require('./routes/login'));
app.use(require('./routes/roomList'));
app.use(require('./routes/unterkunftlist'));
app.use(require('./routes/unterkunftdetails'));
app.use(require('./routes/kontodetails'));
app.use(require('./routes/unterkunftform'));
app.use(require('./routes/zimmerform'));
app.use(require('./routes/zimmerdetails'));


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

module.exports =app;