var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;


// Problem - Random chance to fail with unique apikey
// Solution - pre save function that checks and generates new one if nessesery

/*GameData:[
	{ type: Schema.Types.ObjectId, ref: 'Game' }
]*/

// Schema - User
var userModel = new Schema({
	username:		{ type: String, unique: true, required: true},
	teamname:   	{ type: String },
	description: 	{ type: String },		
	apiKey:         { type: String, unique: true, required: true}
},{
	timestamps: 	true
});

module.exports = mongoose.model('User', userModel);