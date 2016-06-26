var express = require('express');

//Inject module of rest object (User)
var routes = function(User) {
    var userRouter     = express.Router({mergeParams: true});
    var userController = require('../controllers/userController')(User);

    userRouter.route('/')
        .get(userController.getUsers)
        .post(userController.postUsers);

    userRouter.route('/:apiKey')
        .get(userController.getUser)        
        .patch(userController.patchUser)
        .delete(userController.deleteUser);

    return userRouter;
};

module.exports = routes;