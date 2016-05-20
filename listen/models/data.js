var assert = require("assert");
var rndString = require("../lib/randomString");

var Data = function(args){
	assert.ok(args.game, "Game name is required");
	var data = {};

	data.game  		= args.game;
	data.createdAt 	= args.createdAt || new Date();
	data.idToken 	= args.idToken || rndString.randomString(18);
	return data;
};

module.exports = Data;
