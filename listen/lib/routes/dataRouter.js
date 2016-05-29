var events = require("events");
var EventEmitter = require("events").EventEmitter;
 
var ee = new EventEmitter();
ee.on("getData", function (id) {
    console.log(id);
});

/*
	http://www.hacksparrow.com/node-js-eventemitter-tutorial.html

	Add these eventEmitters to centralized event bus
	--> thus decopuling routers from server.... tough is it nessecery?
	if not, use:  require('myroute')(Events);

*/


module.exports = (function() {
    'use strict';
    var router = require('express').Router({mergeParams: true});

    router.get('/', function(req, res) {
    	req.app.set('id', req.params.id);
        res.json(req.app.get('id'));
        ee.emit("getData", req.params.id);
    });

    return router;
})();