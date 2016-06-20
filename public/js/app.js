// MODULE INIT
var app = angular.module('RestAPI', []);

// CONTROLLERS
app.controller('RestCtrl', function($scope, $interval){
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
});
