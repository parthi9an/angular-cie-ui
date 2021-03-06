/**
 * Tool View Event Controller 
 */

function ToolViewEventCtrl($scope, apiUrl, apiService, filterGroup, $timeout) {

	var _this = this;
	
	this.viewCountShow = true;
	
	this.viewActivityShow = true;
	
	this.viewActivityOpt = { scaleLabel : "<%= value + ' ms'   %>" 	};
	
	this.init = function() {

		var args = filterGroup.getSelectedFilter();
		_this.getViewCount(args);	
		_this.getViewActivity(args);
	}
	
	$scope.$on('populateSearch', function(event, args) {

		_this.getViewCount(args);
		_this.getViewActivity(args);
	});

	/* Get counts of what views/dialogs are used 
	 * Pie chart
	 */
	
	this.getViewCount = function(args) {
		apiService.post(apiUrl.GET_VIEW_COUNT, args,
				function(data, status) {
			
					_this.viewCountShow = (data.name.length == 0) ? false : true;
					//$timeout resolve : Hovering over chart shows old chart data
					$timeout(function() {
						_this.viewData = data;
					});
					
				});
	}
	
	/*
	 * Get total and average duration of activity within views/dialog 
	 * Pie chart
	 */
	
	this.getViewActivity = function(args){
		apiService.post(apiUrl.GET_VIEW_ACTIVITY, args,
				function(data, status) {
			
					_this.viewActivityShow = (data.name.length == 0) ? false : true;
					//$timeout resolve : Hovering over chart shows old chart data
					$timeout(function() {
						_this.viewGraphData = data;
					});
					
				});		
	}
	
	this.init();
	
}

/**
 * 
 * Pass all functions into module
 */

angular.module('cie').controller('ToolViewEventCtrl', ToolViewEventCtrl);