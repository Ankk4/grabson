var port       = process.env.PORT || '8080';
var mongoURL   = process.env.MONGO || 'mongodb://localhost/gameapi';

var express    = require('express');
var app        = express();
var path       = require('path');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Schema     = mongoose.Schema();
var colors     = require('colors');

console.log("       ..---.. ".yellow);
console.log("     .'  _    `. ".yellow);
console.log(" __..'  (o)    : ".yellow);
console.log("`..__          ; ".yellow);
console.log("     `.       / ".yellow);
console.log("       ;      `..---...___ ".yellow);
console.log("     .'                   `~-. .-') ".yellow);
console.log("    .                         ' _.' ".yellow);
console.log("   :     MadeBy: Ankk4          : ".yellow);
console.log("   \                           '".yellow);
console.log("    +                         J".yellow);
console.log("     `._                   _.'".yellow);
console.log("        `~--....___...---~' ".yellow);  
console.log("RESTful API for collecting game data.".yellow);	

// Fake sync connection, no need to worry about first connecting
mongoose.connect('mongodb://localhost/gameapi');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database connection error:'.red));
db.once('open', function() { console.log('Database connected.'.green); });

// Initialize routers
var Game = require('../models/game'); var gameRouter = require('./routes/gameRouter')(Game);
var User = require('../models/user'); var userRouter = require('./routes/userRouter')(User);
var pageRouter = require('./routes/pageRouter')(User); // Why is dependecy injection needed here?! 

app
	.use(bodyParser.urlencoded({extended: true}))
	.use(bodyParser.json())
	.use(express.static(path.join(__dirname, '../'), {index: 'index.html'}))
	.use('/', pageRouter)
	.use('/games', gameRouter)
	.use('/users', userRouter);
	
app.listen(port, function(){
	console.log(colors.green("Running on port: " + port));
}); 
