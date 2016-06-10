var express = require('express');
var assert  = require('assert');
var rnd = require("../../lib/randomString");

//Inject module of rest object (User)
var routes = function(User) {
    var apiRouter = express.Router({mergeParams: true});

    apiRouter.route('/')
        .get(function(req, res) { 
            User.find({}, function(err, obj) {
                res.send(obj);
            });
            // Send front page 
            // list of users, form to create new
        })
        .post(function(req, res) {
            req.body.apiKey = rnd.randomString();
            user = new User(req.body);
            console.log(user);
            user.save(function(err, obj) {
                if(err) console.error(err);
                else res.status(201).send(user);
            });
        });
    return apiRouter;
};

module.exports = routes;
