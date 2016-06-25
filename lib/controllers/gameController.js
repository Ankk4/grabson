var gameController = function(User, Game) {

	// Get all games
	var getGames = function(req, res) { 
        Game.find({}, function(err, games) {
            res.json(games);
        });
    };

    // Get single game data by its _id value
    var getGame = function(req, res) {
        Game.find({_id: req.params.id}, function(err, games) {
            if(err) res.status(500).send(err);
            else res.json(games);
        });
    };

    // Update a single game by _id
    var patchGame = function(req, res) {
        if(req.body._id) delete req.body._id;
        var query   = { _id: req.params.id }, 
            options = { new: true },
            newData = req.body;
        Game.findOneAndUpdate(query, newData, options, function(err, obj) {
            if(err) res.status(500).send(err);
            else res.json(obj);
        });
    };

    // Delete single game by _id
    var deleteGame = function(req, res) {
        var query = { _id: req.params.id };
        User.findOneAndRemove(query, function(err, obj) {
            if(err) res.status(500).send(err);
            else res.status(204).send('Resource deleted successfully');
        });
    };

    // Get all games by apiKey
    var getGamesWithKey = function(req, res) {
        var query = { apiKey: req.params.apiKey };
        Game.find(query, function(err, games) {
            if (err) res.status(500).send("error: Something failed!");
            else if (!games.length) res.status(204).send("No content matches parameters.");
            else res.json(games);
        });
    };

    // Create new game data with user.apikey
    var postGameWithKey = function(req, res) { 
        var query = { apiKey: req.params.apiKey };
        User.findOne(query, function(err, obj) {
            if (err) res.status(500).send(err);
            else if (obj === null) res.status(204).send("No user with this apiKey, please create one first.");
            else {
                var game = new Game(req.body);      //get data from body
                game.apiKey = req.params.apiKey;    //save apiKey to game object
                game.save(function(err, obj) {
                    if(err) res.status(500).send(err);
                    else res.status(201).send(game);
                });
            }
        });
    };

    return {
    	getGames: 			getGames,
    	getGame: 			getGame,
    	patchGame: 			patchGame,
    	deleteGame: 		deleteGame,
    	getGamesWithKey: 	getGamesWithKey,
    	postGameWithKey: 	postGameWithKey

    };
};

module.exports = gameController;