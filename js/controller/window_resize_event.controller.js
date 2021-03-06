/**
 * Tool Window Resize Event controller
 */

function ToolWindowResizeEventCtrl($scope, apiUrl, apiService, filterGroup, $timeout) {

	var _this = this;

	this.showWndGraph = true;

	$scope.selected = filterGroup.getSelectedFilter();
	
	this.init = function() {
		
		if(Array.isArray($scope.selected['context_type']) && $scope.selected['context_type'].length > 0)
		  _this.getCountOfMovedWindow($scope.selected);
	}

	$scope.$on('populateSearch', function(event, args) {
		_this.getCountOfMovedWindow(args);
	});
	
	$scope.$on('contextTypeUpdated', function(event) {
		_this.getCountOfMovedWindow($scope.selected);
	});

	/*
	 * Counts of how many times each window is moved or resized
            what views are visible when they do this?
	 * Pie chart
	 */

	this.getCountOfMovedWindow = function(args) {
		
		var wArgs = {};
		angular.copy(args, wArgs);
		if((typeof args['context_type'] === 'undefined' || args['context_type'].length == 0) && 
				(typeof $scope.filterList !== 'undefined' && typeof $scope.filterList.context_type !== 'undefined')){
			wArgs['context_type'] = $scope.filterList.context_type;
		
		}
		if(typeof wArgs['context_type'] !== 'undefined' && wArgs['context_type'].length > 0){
			apiService.post(apiUrl.GET_COUNT_OF_MOVED_WINDOW, wArgs,
					function(data, status) {
						
						_this.showWndGraph = (data.name.length == 0) ? false : true;
						$timeout(function() {
							_this.windowResizeData = data;
						});
						
					});
		}
		
	}

	this.init();

}

/**
 * 
 * Pass all functions into module
 */

angular.module('cie').controller('ToolWindowResizeEventCtrl', ToolWindowResizeEventCtrl);