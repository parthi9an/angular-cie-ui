/**
 * Domain Controller 
 */

function DomainCtrl($scope, apiUrl, apiService, filterGroup, $timeout) {

	var _this = this;
	
	this.init = function() {

		var args = filterGroup.getSelectedFilter();
		_this.getCountOfLoginUser(args);	
		
	}
	
	$scope.$on('populateSearch', function(event, args) {

		_this.getCountOfLoginUser(args);	
		
	});

	/* how many users login via LDAP, composite, or dynamic domains.
	 * Pie chart
	 */
	
	this.getCountOfLoginUser = function(args) {
		apiService.post(apiUrl.GET_COUNT_OF_LOGIN_USER, args,
				function(data, status) {
					$timeout(function() {
						_this.loginUserData = data;
					});	
				});
	}
	
	this.init();
	
}

/**
 * 
 * Pass all functions into module
 */

angular.module('cie').controller('DomainCtrl', DomainCtrl);