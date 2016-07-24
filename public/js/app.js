/* 	Copyright © Antero Juutinen
	Feel free to use and modify this to your own uses, but do not hold me liable. -->
	WTFNMFPL-1.0
*/
var RestAPI = angular.module('RestAPI', ['ngRoute']);

// Routes
RestAPI.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'public/views/home.html',
			controller: 'HomeCtrl'
		})
		.when('/newteam', {
			templateUrl: 'public/views/newTeam.html',
			controller: 'NewTeamCtrl'
		})
		.when('/routeinfo', {
			templateUrl: 'public/views/routeInfo.html',
			controller: 'RouteInfoCtrl'
		});
});

// Overlord
RestAPI.controller('RestCtrl', ['$scope', '$log', function($scope, $log) {

}]);

// Home
RestAPI.controller('HomeCtrl', ['$scope', '$log', function($scope, $log) {

}]);

// Create new team
RestAPI.controller('NewTeamCtrl', ['$scope', '$log', '$interval', function($scope, $log, $interval) {
	// Display realtime on form
	var tick = function() { $scope.realtime = Date.now(); }
	tick();
	$interval(tick, 1000);

    $scope.validate_createForm = function() {
        var user_form_obj = {
			username: 		$scope.createForm.username.$modelValue,
			teamname:   	$scope.createForm.teamname.$modelValue,
			description: 	$scope.createForm.description.$modelValue
        };
    }
}]);

// Route info
RestAPI.controller('RouteInfoCtrl', ['$scope', '$log', function($scope, $log) {

}]);