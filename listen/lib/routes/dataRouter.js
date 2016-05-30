var db = require('../db');

// Models
var Data = require('../../models/dataModel');

module.exports = (function() {
    'use strict';
    var router = require('express').Router({mergeParams: true});

    //Get for querying with ?key=value
    router.get('/', function(req, res) {
        var query = req.query;
        console.log("Query for: " + JSON.stringify(query));        
        var result = db.QueryData(DataModel, query);
        res.json(result);
    });

    //Get for getting single data by id games/id
    router.get('/:gameId', function(req, res) {
        console.log("Query by id: " + req.params.gameId);
        var result = db.GetById(DataModel, req.params.gameId);
        if(result !== null) {
            //Success
            res.json(result);
        } else {
            res.status(500).send({ error: 'Something failed!' });
        }        
    });

    router.post('', function(req, res) {
        var data = new Data();

    });

    return router;
})();