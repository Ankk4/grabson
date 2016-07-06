var gameController = function(User, Game) {

	// Get all games
	var getGames = function(req, res) { 
        Game.find({}, function(err, games) {
            if(err) res.status(500).send(err);
            else {
                var newObjects = [];
                games.forEach(function(element, index, array) {
                    var newObject = element.toJSON();
                    newObject.links = {};
                    newObject.links.self = 'http://' + req.headers.host + '/games/single/' + newObject._id;
                    newObject.links.owner = 'http://' + req.headers.host + '/users/' + newObject.apiKey;
                    newObjects.push(newObject);
                });
                res.json(newObjects);
            }
        });
    };

    // Get single game data by its _id value
    var getGame = function(req, res) {
        Game.find({_id: req.params.id}, function(err, games) {
            if(err) res.status(500).send(err);
            else {
                var newObjects = [];
                games.forEach(function(element, index, array) {
                    var newObject = element.toJSON();
                    newObject.links = {};
                    newObject.links.owner = 'http://' + req.headers.host + '/users/' + newObject.apiKey;
                    newObjects.push(newObject);
                });
                res.json(newObjects);
            }
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
            else {
                var newObjects = [];
                games.forEach(function(element, index, array) {
                    var newObject = element.toJSON();
                    newObject.links = {};
                    newObject.links.self = 'http://' + req.headers.host + '/games/single/' + newObject._id;
                    newObject.links.owner = 'http://' + req.headers.host + '/users/' + newObject.apiKey;
                    newObjects.push(newObject);
                });
                res.json(newObjects);
            }
        });
    };

    // Create new game data with user.apikey
    var postGameWithKey = function(req, res) { 
        var query = { apiKey: req.params.apiKey };
        // find user with given apikey
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
                obj.games.push(game._id);
                obj.save();
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