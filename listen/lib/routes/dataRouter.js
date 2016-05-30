var db = require('../db');

module.exports = (function() {
    'use strict';
    var router = require('express').Router({mergeParams: true});

    router.get('/', function(req, res) {
        var query = req.query;
        var result = db.QueryData(query);
        res.json(result);
    });

    router.get('/:gameId', function(req, res) {
        var result = db.GetById(req.params.id);
        res.json(result);
    });

    return router;
})();