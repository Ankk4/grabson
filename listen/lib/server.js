
 


var port       = process.env.PORT || '8080';
var express    = require('express');
var app        = express();

var dataRouter = require('./routes/dataRouter');

// :ID = name of the game
app.use('/data/get/:id', dataRouter);

app.get('/', function(req, res) {
	res.send('Satan is our lord.');
});

app.listen(port, function(){
	console.log("Running on port: " + port);
}); 

console.log(app.get('id'));