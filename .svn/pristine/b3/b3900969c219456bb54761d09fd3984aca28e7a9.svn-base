/*
 * Tool Action Event Controller 
 */

function ToolActionEventCtrl($scope, apiUrl, apiService, filterGroup, $timeout) {

	var _this = this;

	this.showGraph = true;
	this.showCmdGraph = true;

	this.init = function() {

		var args = filterGroup.getSelectedFilter();
		
		_this.getActionNames(args);
		_this.getCountOfActionEvent(args);

	}

	/*
	 * Get count of action type commands Pie chart
	 */

	this.getCommandCountOfAction = function(args) {

		apiService.post(apiUrl.GET_COMMAND_COUNT_OF_ACTION, args,
				function(data, status) {
					
					_this.showCmdGraph = (data.name.length == 0) ? false : true;
					$timeout(function() {
						_this.selectedCommand = data;
					});
					
				});
	}

	/*
	 * Get count of all action event type Pie chart
	 */

	this.getCountOfActionEvent = function(args) {

		apiService.post(apiUrl.GET_COUNT_OF_ACTION_KEY, args,
				function(data, status) {
					
					_this.showGraph = (data.name.length == 0) ? false : true;
					$timeout(function() {
						_this.actionData = data;
					});

				});
	}

	$scope.$on('populateSearch', function(event, args) {

		_this.getActionNames(args);
		_this.selectedCommand = {"name":[],"count":[]};
		_this.showCmdGraph = true;
		_this.getCountOfActionEvent(args);
	});

	this.changeCommandSelection = function() {
		if (_this.actionCommand) {
			var args = {};
			angular.copy(filterGroup.getSelectedFilter(), args);
			args['actionKey'] = _this.actionCommand;
			_this.getCommandCountOfAction(args);
		} else {
			_this.selectedCommand = {"name": [], "count": []};
		}	

	}

	/*
	 * Get action event type names
	 */
	this.getActionNames = function(args) {
		apiService.post(apiUrl.GET_ACTION_NAMES, args, function(data,
				status) {
			_this.actionCommandList = data.names;
		});
	}

	this.init();

}

/**
 * 
 * Pass all functions into module
 */

angular.module('cie').controller('ToolActionEventCtrl', ToolActionEventCtrl);