/**
 * User Controller 
 */

function UserCtrl($scope, apiUrl, apiService, filterGroup, $timeout) {

	var _this = this;
	
	this.init = function() {

		var args = filterGroup.getSelectedFilter();
		_this.getCountOfUsers(args);
		_this.getCountOfSessions(args);
	}
	
	$scope.$on('populateSearch', function(event, args) {

		_this.getCountOfUsers(args);
		_this.getCountOfSessions(args);
	});
	
	/*
	 * Get  
	 * Pie chart
	 */
	
	this.getCountOfUsers = function(args) {
		apiService.post(apiUrl.GET_COUNT_OF_USERS, args,
				function(data, status) {
					$timeout(function() {
						_this.userData = data;
					});
				});
	}
	
	/*
	 *  Pie chart of user session counts per site. 
	 *    Maybe we can drill down from this to list the user sessions
	 */
	this.getCountOfSessions = function(args) {
		apiService.post(apiUrl.GET_COUNT_OF_SESSIONS, args,
				function(data, status) {
					$timeout(function() {
						_this.userSessionData = data;
					});
				});
	}
	
	this.init();
	
}

/**
 * 
 * Pass all functions into module
 */

angular.module('cie').controller('UserCtrl', UserCtrl);