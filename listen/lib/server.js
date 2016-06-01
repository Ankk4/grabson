var port       = process.env.PORT || '8080';
var express    = require('express');
var app        = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var Game = require('../models/game');
var gameRouter = require('./routes/gameRouter')(Game);
app.use('/api', gameRouter);

app.get('/', function(req, res) {
	res.send('Satan is our lord.');
});

app.listen(port, function(){
	console.log("Running on port: " + port);
}); 

