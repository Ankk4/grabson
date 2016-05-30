var mongoose   = require('mongoose');
var Schema     = mongoose.Schema();

// Fake sync connection, no need to worry about first connecting
mongoose.connect('mongodb://localhost/gamedata');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database connection error:'));
db.once('open', function() {
	console.log("Database connected.");
  // we're connected!
});

var InsertData = function(model, instance) {
	// new data instance created with data model and then saved
	var data = new Model(instance);
	data.save(function (err, obj) {
		if (err) return console.error(err);
	});
};

var QueryData = function(model, query) {
	model.find(query, function(err, data){
		if (err) return console.error(err);
		return data;
	});
};

var GetById = function(model, id) {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		console.log("ObjectID is not valid: ", id);
		return null;
	}
	else {
		model.findById(id, function(err, data){
			if (err) {
				console.error("Something happend while working with db: ", err);
				return null;
			}
			else 
				return data;
		});
	}
};

module.exports.InsertGameData = InsertData;
module.exports.QueryData      = QueryData;
module.exports.GetById        = GetById;