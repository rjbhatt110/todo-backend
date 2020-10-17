var express = require('express')
var app = express();
var mainRoutes = require('./routes/routes');
var bodyParser = require('body-parser');
const jwt = require('./helper/jwt');
const errorHandler = require('./helper/error-handler');
const cors = require('cors');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(jwt());

app.use('/', mainRoutes);
app.use(errorHandler);


app.get('/todo', (req, res) => res.send('Hello Todo!'))

module.exports = app;
