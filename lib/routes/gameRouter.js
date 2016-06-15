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
            Game.find({apiKey: req.params.apiKey}, function(err, games) {
                if (err) {
                    console.error("Something happend while working with db: ", err); 
                    res.status(500).send("error: Something failed!");
                }
                else if (!games.length) {
                    res.status(204).send("No content matches parameters.");
                    console.log("Empty query results.");
                }
                else {
                    res.json(games);
                }
            });
        })
        //Create new game data with already created user.apikey
        .post(function(req, res) {
            User.findOne({apiKey: req.params.apiKey}, function(err, apiKey) {
                if (apiKey === null) {
                    console.log("Bad request. No user with this apiKey: ", req.params.apiKey);
                    res.status(204).send("No user with this apiKey, please create one first.");
                } else {
                    var game = new Game(req.body);      //get data from body
                    game.apiKey = req.params.apiKey;    //save url parameter to game object
                    game.save(function(err, obj) {
                        if(err) res.status(500).send(err);
                        else res.status(201).send(game);
                    });
                }
            });
        });
    return gameRouter;
};

module.exports = routes;