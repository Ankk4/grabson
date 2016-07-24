/* 	Copyright © Antero Juutinen
	Feel free to use and modify this to your own uses, but do not hold me liable. -->
	WTFNMFPL-1.0
*/

var port       = process.env.PORT || '8080';
var mongoURL   = process.env.MONGO || 'mongodb://localhost/gameapi';

var express    = require('express');
var app        = express();
var path       = require('path');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Schema     = mongoose.Schema();
var colors     = require('colors');	
var log        = require('./pretty-log');

log.Start(true, "RESTful API for collecting game data.", "Antero Juutinen", "WTFNMFPL-1.0");

// Fake sync connection, no need to worry about first connecting
mongoose.connect('mongodb://localhost/gameapi');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database connection error:'.red));
db.once('open', function() { 
	log.Print("Database connected", 1); 
});

// Initialize routers
var Game = require('../models/game'); var gameRouter = require('./routes/gameRouter')(Game);
var User = require('../models/user'); var userRouter = require('./routes/userRouter')(User);
var pageRouter = require('./routes/pageRouter')(User); // Why is dependecy injection needed here?! 

// Express apps
app
	.use(bodyParser.urlencoded({extended: true}))
	.use(bodyParser.json())
	.use(express.static(path.join(__dirname, '../'), {index: 'index.html'}))
	.use('/', pageRouter)
	.use('/games', gameRouter)
	.use('/users', userRouter);
	
app.listen(port, function(){
	log.Print("Running on port: " + port, 1);
}); 
