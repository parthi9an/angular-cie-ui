/**
 * Tool Configuration Event controller
 * 
 */

function ToolConfigEventCtrl($scope, apiUrl, apiService, filterGroup, $timeout) {

	var _this = this;
	
	_this.overriddenConfShow = true;
	
	this.init = function() {

		var args = filterGroup.getSelectedFilter();
		_this.getOverriddenConfigCount(args);
	}

	$scope.$on('populateSearch', function(event, args) {

		_this.getOverriddenConfigCount(args);

	});

	/*
	 * Get count of overridden Configurations
	 * Pie chart
	 */

	this.getOverriddenConfigCount = function(args) {
		apiService.post(apiUrl.GET_OVERRIDDEN_CONFIG_COUNT, args,
				function(data, status) {
					
					_this.overriddenConfShow = (data.name.length == 0) ? false : true;
					$timeout(function() {
						_this.overriddenConfigData = data;
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
		.controller('ToolConfigEventCtrl', ToolConfigEventCtrl);