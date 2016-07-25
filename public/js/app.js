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
RestAPI.controller('RestCtrl', ['$scope', '$log', '$location', function($scope, $log, $location) {
	$scope.items = [
  		{ path: '/', 			title: 'Home'				},
      	{ path: '/newteam', 	title: 'Create new team'	},
      	{ path: '/routeinfo', 	title: 'Route info'			}
    ];

    $scope.isActive = function(item) {
  		if (item.path == $location.path()) {
    		return true;
      	}
      	return false;
    };

}]);

// Home
RestAPI.controller('HomeCtrl', ['$scope', '$log', function($scope, $log) {

}]);

// Create new team
RestAPI.controller('NewTeamCtrl', ['$scope', '$log', '$http', function($scope, $log, $http) {
	$scope.success = false;
    $scope.submit = function() {
        var user_obj = {
			username: 		$scope.username,
			teamname:   	$scope.teamname,
			description: 	$scope.description
        };

        var data = JSON.stringify(user_obj);

        $http({
	  		method: 'POST',
		  	url: '/users',
		  	headers: {'Content-Type': 'application/JSON'},
		  	data: JSON.stringify(user_obj)
		}).then(function successCallback(response) {
	    	$scope.apikey = response.data.apikey;
	    	$scope.success = true;

	  	}, function errorCallback(response) {	
	    	alert('Oh ou something went terribly wrong!\n\nERROR MESSAGE: ' + response.data.errmsg);
	  	});
    };
}]);

// Route info
RestAPI.controller('RouteInfoCtrl', ['$scope', '$log', function($scope, $log) {

}]);