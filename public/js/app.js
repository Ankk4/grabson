// MODULE INIT
var app = angular.module('RestAPI', []);

// CONTROLLERS
app.controller('RestAPI', function($scope){
    $scope.validate_createForm = function() {
        //Already validated.. Password check here?
        // $scope.createForm.password.$modelValue;
        var vm_form_obj = {
            password:   $scope.createForm.password.$modelValue,
            mname:      $scope.createForm.mname.$modelValue,
            quantity:   $scope.createForm.quantity.$modelValue,
        };
    }
});
