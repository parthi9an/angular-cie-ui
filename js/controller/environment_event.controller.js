/*
 * Tool Environment Event Controller 
 */

function ToolEnvironmentEventCtrl($scope, apiUrl, apiService, filterGroup, $timeout) {

	var _this = this;
	
	this.envBreakdownShow = true;
	
	this.init = function() {
		
		_this.getEnvProperties();

	}
	
	$scope.$on('populateSearch', function(event, args) {

		if(_this.envProperty){			
			_this.getEnvBreakdown(args);
		} else {
			_this.selectedProp = {"name":[],"count":[]};
		}
	});
	
	
	/*
	 * Pie charts showing environmental breakdowns per session, user, and site
	 */
	
	this.getEnvBreakdown = function(args) {
		
		var envArgs = {};
		angular.copy(args, envArgs);
		envArgs['property'] = _this.envProperty;
		
		apiService.post(apiUrl.GET_ENV_BREAKDOWN, envArgs,
			function(data, status) {
								
				_this.envBreakdownShow = (data.name.length == 0) ? false : true;
				$timeout(function() {
					_this.selectedProp = data;
				});
				
			});
	}	
	
	this.changeProperty = function() {
		
		if(_this.envProperty){
			_this.getEnvBreakdown(filterGroup.getSelectedFilter());
		} else {
			_this.selectedProp = {"name":[],"count":[]};
		}
	}
	
	
	/*
	 * Get all environment event properties
	 */
	this.getEnvProperties = function() {
		apiService.get(apiUrl.GET_ENV_PROPERTIES,
				function(data, status) {
					_this.envPropertyList = data.names;
				});
	}
	
	this.init();

}

/**
 * 
 * Pass all functions into module
 */

angular.module('cie').controller('ToolEnvironmentEventCtrl', ToolEnvironmentEventCtrl);