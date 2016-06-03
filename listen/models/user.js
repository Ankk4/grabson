var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

// Schema - User
var userModel = new Schema({
	username:		{ type: String, unique: true},
	teamname:   	{ type: String },
	description: 	{ type: String },		
	createdAt: 		{ type: Date, default: Date.now },
	apiKey:         { type: String, unique: true }
});

module.exports = mongoose.model('User', userModel);