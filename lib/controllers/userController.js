var rnd  = require("../../lib/randomString");
var path = require('path');

var userController = function(User) {

    // Get all users 
    var getUsers = function(req, res) {
        User.find({}, function(err, users) {
            if(err) res.status(500).send(err);
            else {
                var newObjects = [];
                users.forEach(function(element, index, array) {
                    var newObject = element.toJSON();
                    newObject.links = {};
                    newObject.links.self = 'http://' + req.headers.host + '/users/' + newObject.apikey;
                    newObject.links.games = 'http://' + req.headers.host + '/games/' + newObject.apikey;
                    newObjects.push(newObject);
                });
                res.json(newObjects);
            }
        });
    };

   // Create new user
    var postUsers = function(req, res) {
        req.body.apikey = rnd.randomString();
        user = new User(req.body);
        user.save(function(err, obj) {
            if(err) res.status(500).send(err);
            else res.status(201).send(user);
        });
    };

    // Get user by apikey
    var getUser = function(req, res) { 
        User.find({apikey: req.params.apikey}, function(err, obj) {
            if(err) res.status(204).send(err);
            else {
                var newObjects = [];
                obj.forEach(function(element, index, array) {
                    var newObject = element.toJSON();
                    newObject.links = {};
                    newObject.links.games = 'http://' + req.headers.host + '/games/' + newObject.apikey;
                    newObjects.push(newObject);
                });
                res.json(newObjects);
            }
        }); 
    };

    // Change values on existing user
    var patchUser = function(req, res) {
        if(req.body._id) delete req.body._id;

        var query   = { apikey: req.params.apikey }, 
            options = { new: true },
            newData = req.body;

        User.findOneAndUpdate(query, newData, options, function(err, obj) {
            if(err) res.status(500).send(err);
            else res.json(obj);
        });
    };

    // Delete user by apikey
    var deleteUser = function(req, res) {
        var query = { apikey: req.params.apikey };
        User.findOneAndRemove(query, function(err, obj) {
            if(err) res.status(500).send(err);
            else res.status(204).send('Resource deleted successfully');
        });
    };

    return {
        getUsers:   getUsers,
        postUsers:  postUsers,
        getUser:    getUser,
        patchUser:  patchUser,
        deleteUser: deleteUser
    };
};

module.exports = userController;