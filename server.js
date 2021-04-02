const express = require('express');

const port = process.env.PORT || 3000;
var app = express();
const bodyParser = require('body-parser');



app.set('view engine', 'ejs');

app.use('/public',express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(require('./routes/start'));
app.use(require('./routes/login'));
app.use(require('./routes/roomList'));
app.use(require('./routes/hotelList'));
app.use(require('./routes/detailedRoom'));



app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

module.exports =app;