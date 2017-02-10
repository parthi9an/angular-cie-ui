 
angular.module('cie') 

.controller('LoginController',    ['$scope', '$rootScope', '$location', 'filterGroup', 'AuthenticationService',
    function ($scope, $rootScope, $location, filterGroup, AuthenticationService) {
        // reset login status
       // AuthenticationService.ClearCredentials();
 
        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.login($scope.username, $scope.password, function(response) {
                if(response.success) {
                    AuthenticationService.setCredentials($scope.username, response['Access-Token']);
                    $location.path('/');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
        
        $scope.logout = function () {
        	
            AuthenticationService.clearCredentials();
            filterGroup.clearSelectedFilter();
            $location.path('/login');
            
        };
        
        $scope.$on('unAuthorized', function(event) {
            $scope.logout();
            $scope.error = "401 Unauthorized Access!";
        })
        	
    }]);