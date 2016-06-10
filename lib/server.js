var port       = process.env.PORT || '8080';
var express    = require('express');
var app        = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var mongoose   = require('mongoose');
var Schema     = mongoose.Schema();

// Fake sync connection, no need to worry about first connecting
mongoose.connect('mongodb://localhost/GameAPI');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database connection error:'));
db.once('open', function() {
	console.log("Database connected.");
  // we're connected!
});

var Game = require('../models/game');
var gameRouter = require('./routes/gameRouter')(Game);
app.use('/', gameRouter);

var User = require('../models/user');
var apiRouter = require('./routes/apiRouter')(User);
app.use('/', apiRouter);	

app.listen(port, function(){
	console.log("Running on port: " + port);
}); 

