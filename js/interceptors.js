/**
 * Authentication Interceptor
 */

angular.module('cie').factory("authInterceptor" , [ '$rootScope', '$q', function($rootScope, $q)  {
	
    return {
    	
        request : function (config) {
            var deferred = $q.defer();
            if(!config.url.match(/\bauthenticate\b|\.html/) && 
            		(config.headers['Access-Token'] == undefined || config.headers['Access-Token'] == "")){
                 deferred.reject(config);
                 $rootScope.$broadcast('unAuthorized');
                 return deferred.promise;
            }
            deferred.resolve(config);
            return deferred.promise;
        },
        
        responseError : function (rejection) {
            var deferred = $q.defer();
            if(rejection.status == 401){
            	$rootScope.$broadcast('unAuthorized');
            } 
            deferred.reject(rejection);            
            return deferred.promise;
        }
    }
}]);

