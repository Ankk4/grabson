var express = require('express');

var routes = function(User) {
    var pageRouter     = express.Router({mergeParams: true});
    var pageController = require('../controllers/pageController')(User);
    console.log("THIS IS pageController: ", pageController);

    pageRouter.route('/').get(pageController.get);

    return pageRouter;
};

module.exports = routes;