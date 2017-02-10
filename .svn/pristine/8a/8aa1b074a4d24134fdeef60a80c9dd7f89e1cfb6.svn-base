/**
 * Tool Keyboard Event controller
 * 
 */

function ToolKeyboardEventCtrl($scope, apiUrl, apiService, filterGroup, $timeout) {

	var _this = this;
	
	this.keyCmdInvokedShow = true;
	
	this.init = function() {

		var args = filterGroup.getSelectedFilter();
		_this.getCommandCountByInvoked(args);
	}

	$scope.$on('populateSearch', function(event, args) {

		_this.getCommandCountByInvoked(args);
	});

	/*
	 * Get counts of how actions are invoked
	 * Pie chart
	 */

	this.getCommandCountByInvoked = function(args) {
		apiService.post(apiUrl.GET_COMMAND_COUNT_BY_INVOKED, args,
				function(data, status) {
					
					_this.keyCmdInvokedShow = (data.name.length == 0) ? false : true;
					$timeout(function() {
						_this.keyboardData = data;
					});
					
				});
	}

	this.init();

}

/**
 * 
 * Pass all functions into module
 */

angular.module('cie')
		.controller('ToolKeyboardEventCtrl', ToolKeyboardEventCtrl);