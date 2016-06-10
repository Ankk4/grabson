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

    //Get all games by apiKey, Create new with spefied apiKey
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
        .post(function(req, res) {
            User.findOne({apiKey: req.params.apiKey}, function(err, apiKey) {
                if (apiKey === null) {
                    console.log("Bad request. No such apiKey: ", apiKey);
                    res.status(400).send("Bad request. No such apiKey, please create one first.");
                } else {
                    assert.ok(req.body.apiKey, "No apiKey defined in body");
                    var game = new Game(req.body);
                    game.save(function(err, obj) {
                        if(err) console.error(err);
                        else res.status(201).send(game);
                    });
                }
            });
        });
    return gameRouter;
};

module.exports = routes;