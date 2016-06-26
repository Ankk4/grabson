var express = require('express');
var User    = require('../../models/user');

//Inject module of rest object (Game)
var routes = function(Game) {
    var gameRouter     = express.Router({mergeParams: true});
    var gameController = require('../controllers/gameController')(User, Game);
    
    gameRouter.route('/')
        .get(gameController.getGames);
    
    gameRouter.route('/single/:id')
        .get(gameController.getGame)
        .patch(gameController.patchGame)
        .delete(gameController.deleteGame);

    gameRouter.route('/:apiKey')
        .get(gameController.getGamesWithKey)
        .post(gameController.postGameWithKey);

    return gameRouter;
};

module.exports = routes;