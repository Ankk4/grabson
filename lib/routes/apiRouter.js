var express = require('express');
var path    = require('path');
var assert  = require('assert');
var rnd     = require("../../lib/randomString");

//Inject module of rest object (User)
var routes = function(User) {
    var apiRouter = express.Router({mergeParams: true});

    apiRouter.route('/')
        .get(function(req, res) { 
            var test = path.join(__dirname, '../../public/index.html');
            // Send front page - list of users, form to create new
            res.sendFile(test);
        });

    apiRouter.route('/users')
        .get(function(req, res) {
            User.find({}, function(err, obj) {
                if(err) res.status(500).send(err);
                else res.json(obj);
            });
        })
        .post(function(req, res) {
            req.body.apiKey = rnd.randomString();
            user = new User(req.body);
            user.save(function(err, obj) {
                if(err) res.status(500).send(err);
                else res.status(201).send(user);
            });
        });

    //user with apikey
    apiRouter.route('/users/:apiKey')
        .get(function(req, res) { // GET USER BY APIKEY
            User.find({apiKey: req.params.apiKey}, function(err, obj) {
                if(err) res.status(204).send(err);
                else res.json(obj);
            }); 
        })
        .patch(function(req, res) { // CHANGE VALUES ON EXISTING USER
            var query   = { apiKey: req.params.apiKey };
            var options = { new: true };
            if(req.body._id) delete req.body._id;
            var newData = req.body;
            User.findOneAndUpdate(query, newData, options, function(err, obj) {
                if(err) res.status(500).send(err);
                else res.json(obj);
            });
        });

    return apiRouter;
};

module.exports = routes;



// I desided put is not needed. Its either put or post, not both.
/*
        // .put is basicly not needed - it just combines POST and DELETE
        .put(function(req, res) { // REPLACE EXISTING USER COMPLETELY
            var query = { apiKey: req.params.apiKey };
            var newData = req.body;
            User.findOneAndRemove(query, function(err, obj) {
                if(err) res.status(500).send(err);
            });
            // Create new user with replacing info
            user = new User();
            user.username = newData.username;
            user.teamname = newData.teamname;
            user.description = newData.description;
            user.apiKey = rnd.randomString();
            user.save(function(err, obj) {
                if(err) res.status(500).send(err);
                else res.status(201).send(user);
            });
        })
*/