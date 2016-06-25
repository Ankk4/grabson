var rnd  = require("../../lib/randomString");
var path = require('path');

var apiController = function(User) {
	// Get front page
	var get = function(req, res) { 
        var page = path.join(__dirname, '../../public/index.html');
	    res.sendFile(page);
    };

	// Get all users 
    var getUsers = function(req, res) {
        User.find({}, function(err, obj) {
            if(err) res.status(500).send(err);
            else res.json(obj);
        });
    };

   // Create new user
    var postUsers = function(req, res) {
	    req.body.apiKey = rnd.randomString();
	    user = new User(req.body);
	    user.save(function(err, obj) {
	        if(err) res.status(500).send(err);
	        else res.status(201).send(user);
	    });
	};

    // Get user by apiKey
	var getUser = function(req, res) { 
        User.find({apiKey: req.params.apiKey}, function(err, obj) {
            if(err) res.status(204).send(err);
            else res.json(obj);
        }); 
    };

    // Change values on existing user
    var patchUser = function(req, res) {
        if(req.body._id) delete req.body._id;

        var query   = { apiKey: req.params.apiKey }, 
            options = { new: true },
            newData = req.body;

        User.findOneAndUpdate(query, newData, options, function(err, obj) {
            if(err) res.status(500).send(err);
            else res.json(obj);
        });
    };

    // Delete user by apiKey
    var deleteUser = function(req, res) {
        var query = { apiKey: req.params.apiKey };
        User.findOneAndRemove(query, function(err, obj) {
            if(err) res.status(500).send(err);
            else res.status(204).send('Resource deleted successfully');
        });
    };

    return {
		get: 		get,
		getUsers: 	getUsers,
		postUsers: 	postUsers,
		getUser: 	getUser,
		patchUser: 	patchUser,
		deleteUser: deleteUser
    };
};

module.exports = apiController;