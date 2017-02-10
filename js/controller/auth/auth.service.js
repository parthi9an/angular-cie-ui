'use strict';
 
angular.module('cie')
 
.factory('AuthenticationService',
    ['$http', '$cookieStore', '$rootScope', '$timeout', 'apiUrl', 'conf', 
    function ($http, $cookieStore, $rootScope, $timeout, apiUrl, conf) {
        var service = {};

        service.login = function (username, password, callback) {
                     
           /*  ----------------------------------------------*/
            $timeout(function(){
            	$http.post( conf.apiBaseUrl + '/' + apiUrl.LOGIN, { uName: username, password: password })
                .success(function (response, status, headers, config) {
                	if(response.status == "Success") {
                    	response['success'] = true;
                    	response['Access-Token'] = headers('Access-Token');
                    }
                    callback(response);
                });
            	
            }, 1000);

        };
 
        service.setCredentials = function (username, token) {
        
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: token
                }
            };
 
            $http.defaults.headers.common['Access-Token'] = token;
            $cookieStore.put('globals', $rootScope.globals);
        };
 
        service.clearCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common['Access-Token'] = '';
        };
 
        return service;
    }])

.factory('userDataService', ['$rootScope', function($rootScope) {
    	return {
    		getUserName: function() {
    		    return (!angular.equals({}, $rootScope.globals)) ? $rootScope.globals.currentUser.username
    					: "Unknown";;
    		},
    	};
}]);
 
