var express = require('express');
var assert  = require('assert');
var User    = require('../../models/user');

//Inject module of rest object (Game)
var routes = function(Game) {
    var gameRouter = express.Router({mergeParams: true});
    //Get all games
    gameRouter.route('/games')
        .get(function(req, res) { 
            Game.find({}, function(err, games) {
                res.json(games);
            });
        })
        .post(function(req, res) {
            res.send("Wrong URL to be posting. Please use /games/'your api key'.");
        });

    //Get single game data by its _id value
    gameRouter.route('/games/single/:id')
        .get(function(req, res) {
            Game.find({_id: req.params.id}, function(err, games) {
                if(err) res.status(500).send(err);
                else res.json(games);
            });
        });

    //Get all games by apiKey
    gameRouter.route('/games/:apiKey')
        .get(function(req, res) {
            var query = { apiKey: req.params.apiKey };
            Game.find(query, function(err, games) {
                if (err) res.status(500).send("error: Something failed!");
                else if (!games.length) res.status(204).send("No content matches parameters.");
                else res.json(games);
            });
        })
        .post(function(req, res) { // Create new game data with already created user.apikey
            var query = { apiKey: req.params.apiKey };
            User.findOne(query, function(err, obj) {
                if (err) res.status(500).send(err);
                else if (obj === null) res.status(204).send("No user with this apiKey, please create one first.");
                else {
                    var game = new Game(req.body);      //get data from body
                    game.apiKey = req.params.apiKey;    //save url parameter to game object
                    game.save(function(err, obj) {
                        if(err) res.status(500).send(err);
                        else res.status(201).send(game);
                    });
                }
            });
        })
        .patch(function(req, res) {
            var query   = { apiKey: req.params.apiKey };
            var options = { new: true };
            var newData = req.body;
            Game.findOneAndUpdate(query, newData, options, function(err, obj) {
                if(err) res.status(500).send(err);
                else res.json(obj);
            });
        });
    return gameRouter;
};

module.exports = routes;