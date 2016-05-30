var mongoose   = require('mongoose');
var Schema     = mongoose.Schema();

var DataModel = require('../models/dataModel');
mongoose.connect('mongodb://localhost/gameData');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database connection error:'));
db.once('open', function() {
	console.log("Database connected.");
  // we're connected!
});

var InsertData = function(gameData) {
	// new data instance created with data model and then saved
	var data = new DataModel(gameData);
	data.save(function (err, obj) {
		if (err) return console.error(err);
	});
};

var QueryData = function(query) {
	DataModel.find(query, function(err, data){
		if (err) return console.error(err);
		return data;
	});
};

var GetById = function(id) {
	DataModel.findById(id, function(err, data){
		if (err) return console.error(err);
		return data;
	});
};

module.exports.InsertGameData = InsertData;
module.exports.QueryData      = QueryData;
module.exports.GetById        = GetById;