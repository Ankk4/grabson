var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// Schema - game
var gameModel = new Schema({
	game: 		{ type: String },
	createdAt: 	{ type: Date, default: Date.now },
	data: 		{ type: Object },
	apiKey: 	{ type: String }
});

module.exports = mongoose.model('Game', gameModel);