var db         = require('../db');
var express    = require('express');

//Inject module of rest object (Game)
var routes = function(Game) {
    var gameRouter = express.Router({mergeParams: true});
    gameRouter.route('/games')
        .post(function(req, res) {
        // POST new game data
            var game = new Game(req.body);
            game.save();
            res.status(201).send(game);
        })
        .get(function(req, res) {
        // Get all games         
            console.log("GET all games");       
            var result = db.QueryData(Game, {});
            res.json(result);
        });

    gameRouter.route('/games/:gameId')
        .get(function(req, res) {
        // GET single data by id
            console.log("Query by id: " + req.params.gameId);
            var result = db.GetById(Game, req.params.gameId);
            if(result !== null) {
                //Success
                res.json(result);
            } else {
                res.status(500).send({ error: 'Something failed!' });
            }  
        });

    return gameRouter;
};

module.exports = routes;
