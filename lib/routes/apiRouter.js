var express = require('express');

//Inject module of rest object (User)
var routes = function(User) {
    var apiRouter     = express.Router({mergeParams: true});
    var apiController = require('../controllers/apiController')(User);

    apiRouter.route('/')
        .get(apiController.get);

    apiRouter.route('/users')
        .get(apiController.getUsers)
        .post(apiController.postUsers);

    apiRouter.route('/users/:apiKey')
        .get(apiController.getUser)        
        .patch(apiController.patchUser)
        .delete(apiController.deleteUser);

    return apiRouter;
};

module.exports = routes;