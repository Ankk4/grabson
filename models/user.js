var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;


// Problem - Random chance to fail with unique apikey
// Solution - pre save function that checks and generates new one if nessesery

// Schema - User
var userModel = new Schema({
	username:		{ type: String, unique: true, required: true},
	teamname:   	{ type: String },
	description: 	{ type: String },		
	apiKey:         { type: String, unique: true, required: true},
	games: 			[{ type: Schema.Types.ObjectId, ref: 'Game' }]
},{
	timestamps: 	true
});

module.exports = mongoose.model('User', userModel);