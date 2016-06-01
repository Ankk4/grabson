var mongoose = require('mongoose');
var Schema   = mongoose.Schema();

// Schema - Data
var dataSchema = {
	game: 		{ type: String },
	createdAt: 	{ type: Date },
	data: 		{ type: Object }
};

module.exports = mongoose.model('game', dataSchema);