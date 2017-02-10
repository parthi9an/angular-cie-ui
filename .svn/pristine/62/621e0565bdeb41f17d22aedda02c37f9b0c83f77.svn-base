/**
 * Tool Window Scroll Event controller
 */

function ToolWindowScrollEventCtrl($scope, apiUrl, apiService, filterGroup, $timeout) {

	var _this = this;

	this.showWndGraph = true;
	
	$scope.selected = filterGroup.getSelectedFilter();

	this.init = function() {
		
		if(Array.isArray($scope.selected['context_type']) && $scope.selected['context_type'].length > 0)
		   _this.getCountOfScrollWindow($scope.selected);
		
	}

	$scope.$on('populateSearch', function(event, args) {

		_this.getCountOfScrollWindow(args);
	});

	$scope.$on('contextTypeUpdated', function(event) {
		_this.getCountOfScrollWindow($scope.selected);
	});
	
	/*
	 * count of scroll in a view 
	 * Pie chart
	 */

	this.getCountOfScrollWindow = function(args) {
		var wArgs = {};
		angular.copy(args, wArgs);
		if((typeof args['context_type'] === 'undefined' || args['context_type'].length == 0) && 
				(typeof $scope.filterList !== 'undefined' && typeof $scope.filterList.context_type !== 'undefined')){
			wArgs['context_type'] = $scope.filterList.context_type;
		
		}
		if(typeof wArgs['context_type'] !== 'undefined' && wArgs['context_type'].length > 0){
			apiService.post(apiUrl.GET_COUNT_OF_SCROLL_WINDOW, wArgs,
					function(data, status) {
						
						_this.showWndGraph = (data.name.length == 0) ? false : true;
						$timeout(function() {
							_this.windowScrollData = data;
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

angular.module('cie').controller('ToolWindowScrollEventCtrl', ToolWindowScrollEventCtrl);