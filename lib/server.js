var port       = process.env.PORT || '80';
var express    = require('express');
var app        = express();
var path       = require('path');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Schema     = mongoose.Schema();

// Fake sync connection, no need to worry about first connecting
mongoose.connect('mongodb://localhost/gameapi');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database connection error:'));
db.once('open', function() { console.log("Database connected."); });

// Initialize routers
var Game = require('../models/game'); var gameRouter = require('./routes/gameRouter')(Game);
var User = require('../models/user'); var userRouter = require('./routes/userRouter')(User);
var pageRouter = require('./routes/pageRouter')(User); // Why is dependecy injection needed here?! 



app
	.use(bodyParser.urlencoded({extended: true}))
	.use(bodyParser.json())
	.use(express.static(path.join(__dirname, '../'), {index: 'index.html'})) //hory shitto it works
	.use('/', pageRouter)
	.use('/games', gameRouter)
	.use('/users', userRouter);
	
app.listen(port, function(){
	console.log("Running on port: " + port);
}); 
