var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// Schema - game
var gameModel = new Schema({
	game: 		{ type: String, required: true},
	data: 		{ type: Object },
	apikey: 	{ type: String, required: true}
},{
	timestamps: 	true
});

module.exports = mongoose.model('Game', gameModel);

