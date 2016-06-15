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

    //get user with apikey
    apiRouter.route('/users/:apiKey')
        .get(function(req, res) {
            User.find({apiKey: req.params.apiKey}, function(err, obj) {
                if(err) res.status(204).send(err);
                else res.json(obj);
            });
        })
        .put(function(req, res) {
            User.find({apiKey: req.params.apiKey}, function(err, obj) {
                if(err) res.status(500).send(err);
                else
                    obj.username    = req.body.username;
                    obj.teamname    = req.body.username;
                    obj.description = req.body.username;
                    obj.save(); 
                    res.json(obj);
            });
        });

        
    return apiRouter;
};

module.exports = routes;

