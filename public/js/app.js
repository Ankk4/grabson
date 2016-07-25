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
			description: 	$scope.description,
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
	    	$scope.error = false;

	  	}, function errorCallback(response) {	
	  		if(response.data.code == 11000) {
	  			$scope.errorMsg = "Duplicate username, please refresh the page and choose another one.";
	  			$scope.error = true;
	  			$scope.success = false;
	  			console.log(JSON.stringify(response.data));
	  		}
	  		else
	    		alert('oops something went terribly wrong!\n\nERROR MESSAGE: ' + JSON.stringify(response.data));
	  	});
    };
}]);

// Route info
RestAPI.controller('RouteInfoCtrl', ['$scope', '$log', function($scope, $log) {

}]);