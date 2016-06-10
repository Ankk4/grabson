var assert = require("assert");
var Log = function(args) {
	assert.ok(args.subject && args.entry, "Need subject and entry");
	var log = {};

	log.subject 	= args.subject;
	log.entry 		= args.entry;
	log.createdAt 	= args.createdAt || new Date();

	return log;
};

module.exports = Log;