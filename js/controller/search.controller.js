/**
 * Event Search controller
 * 
 */
function EventSearchCtrl($scope, apiService, apiUrl, $modal, notify, SweetAlert,
		userDataService, filterGroup, $state, $rootScope) {

	var _this = this;
	
	this.username = userDataService.getUserName();

	this.defaultLimit = 5;
	
	this.totalFilterCount = 0;

	this.viewAllFilter = false;

	this.dtSavedFilterOpt = {
		paging : false,
		searching : false,
		info : false,
		ordering : false
	};

	this.dtSavedFilterAllOpt = {
		ordering : false
	};

	this.savedFilterLoading = false;
	
	/*
	 * Initialize
	 */

	this.init = function() {
		
		$scope.selected = filterGroup.getSelectedFilter();
		if($state.current.data.isContextType != undefined){
			$scope.selected['isContextType'] = $state.current.data.isContextType;
		} 
		if ($scope.selected['toDate'] == undefined ){
			$scope.selected['toDate'] = _this.getCurrentTimestamp();
		}
		if ($scope.selected['fromDate'] == undefined ){
			$scope.selected['fromDate'] = $scope.selected['toDate'] - (30 * 86400000); // last 30 days
		} 
		_this.loadFilterList($scope.selected);
		_this.getSavedFilters();

	}

	/*
	 * To clear search filter
	 */

	this.clearSearchFilter = function() {
		
		for (var key in $scope.selected){
		    if ($scope.selected.hasOwnProperty(key)){
		        if ($scope.selected[key] instanceof Array) {
		        	$scope.selected[key] = [];
		        } else if (key == 'toDate'){
		        	$scope.selected[key] = _this.getCurrentTimestamp();
		        } else if (key == 'fromDate'){
		        	$scope.selected[key] = $scope.selected['toDate'] - (30 * 86400000);
		        } else if (key != 'isContextType'){
		        	$scope.selected[key] = undefined;
		        }  
		    }
		}
		
		
	};

	this.loadSaveFilterWindow = function(size) {
		var args = {};

		args['source'] = 
			($scope.selected['source'] !== undefined && $scope.selected['source'].length > 0) 
				? $scope.selected['source']	: ["all"];
		args['version'] = 
			($scope.selected['version'] !== undefined && $scope.selected['version'].length > 0)
				? $scope.selected['version'] : ["all"];
		args['user_id'] = 
			($scope.selected['user_id'] !== undefined && $scope.selected['user_id'].length > 0) 
				? $scope.selected['user_id'] : ["all"];
		args['server_id'] = 
			($scope.selected['server_id'] !== undefined && $scope.selected['server_id'].length > 0)
				? $scope.selected['server_id']	: ["all"];
		args['session_id'] = 
			($scope.selected['session_id'] !== undefined && $scope.selected['session_id'].length > 0)
				? $scope.selected['session_id']	: ["all"];
		args['fromDate'] = ($scope.selected['fromDate'] !== undefined) ? $scope.selected['fromDate'] 
				: "all";
		args['toDate'] = ($scope.selected['toDate'] !== undefined) ? $scope.selected['toDate'] 
				: "all";
		args['uName'] = _this.username;
		args['filtername'] =  "filtername_"	+ (new Date().getTime());
		
		$scope.saveArgs = args;
		$scope.searchObj = _this;
		var modalInstance = $modal.open({
			templateUrl : 'views/saveSearch_window.html',
			controller : saveSearchController,
			size : size,
			scope : $scope
		});
		
	}
	
	/* 
	 * To get the current timestamp
	 */
	
	this.getCurrentTimestamp = function(){
		return new Date().getTime();
	}
	
	/*
	 * To get saved search filter list
	 */

	this.getSavedFilters = function() {
		var args = {};
		args['uName'] = _this.username;
		args['limit'] = (_this.viewAllFilter) ? -1 : _this.defaultLimit;
		_this.savedFilterLoading = true;
		
		filterGroup.getSavedFilterList(args)
			.then(function(data) {
				setTimeout(function() {
					_this.savedFilterList = data.result;
					_this.totalFilterCount = data.totalFilterCount;
					_this.savedFilterLoading = false;
					if (!$scope.$$phase)
						$scope.$apply();
				}, 10);
			}, function(error) {
				console.log('saved filter list retrieval failed.')
			});
	}

	/*
	 * To set search filter
	 */

	this.setSearchFilter = function(filter) {

		$scope.selected['session_id'] = (filter['session_id'][0] != "all") ? filter['session_id']
				: [];
		$scope.selected['server_id'] = (filter['server_id'][0] != "all") ? filter['server_id']
				: [];
		$scope.selected['source'] = (filter['source'][0] != "all") ? filter['source']
				: [];
		$scope.selected['version'] = (filter['version'][0] != "all") ? filter['version']
				: [];		
		$scope.selected['user_id'] = (filter['user_id'][0] != "all") ? filter['user_id']
				: [];
		if(filter['fromDate'] != "all")
			$scope.selected.fromDate = new Date(parseInt(filter['fromDate']));
		if(filter['toDate'] != "all") 
			$scope.selected.toDate = new Date(parseInt(filter['toDate']));

	}

	/*
	 * To delete all saved filter
	 */

	this.deleteAllFilter = function() {

		SweetAlert.swal({
			title : "Are you sure?",
			text : "Your will not be able to recover the list",
			type : "warning",
			showCancelButton : true,
			confirmButtonColor : "#DD6B55",
			confirmButtonText : "Delete All",
			closeOnConfirm : true
		}, function(isConfirm) {
			if (isConfirm) {
				filterGroup.deleteAllFilter({'uName' : _this.username})
					.then(function(data) {
						if (data.status == "Failed") {
							notify({
								message : 'Error :- ' + data.message,
								classes : 'alert-danger',
								templateUrl : 'views/common/notify.html'
							});

						} else {
							notify({
								message : 'Success :- ' + data.message,
								classes : 'alert-success',
								templateUrl : 'views/common/notify.html'
							});
							_this.getSavedFilters();
						}
					
					}, function(error) {
						console.log('Delete all filter failed.')
					});
			}
		});
	}

	/*
	 * To delete search filter
	 */

	this.deleteFilterRecord = function(id) {
		
		id = id.replace('#', '');
		filterGroup.deleteFilter({'rid' : id})
			.then(function(data) {
				if (data.status == "Failed") {
					notify({
						message : 'Error :- ' + data.message,
						classes : 'alert-danger',
						templateUrl : 'views/common/notify.html'
					});

				} else {
					notify({
						message : 'Success :- ' + data.message,
						classes : 'alert-success',
						templateUrl : 'views/common/notify.html'
					});
					_this.getSavedFilters();
				}
			}, function(error) {
				console.log('Delete filter record failed.')
			});
		
	}

	/*
	 *  Get all filter list
	 */
	
	this.loadFilterList = function(args) {
		filterGroup.loadFilterList(args)
			.then(function(list) {
				$rootScope.filterList = list;
			}, function(error) {
				console.log('filter list retrieval failed.')
			});
	}
	
	$scope.$watchCollection('selected', function(newVal, oldVal){
		if(!angular.equals(newVal, oldVal)){
			if(typeof newVal.fromDate === 'object'){
				newVal.fromDate = new Date(newVal.fromDate).getTime();
			}
			if(typeof newVal.toDate === 'object'){
				newVal.toDate = new Date(newVal.toDate).getTime();
			}
			_this.loadFilterList(newVal);
			filterGroup.setSelectedFilter(newVal);
			$rootScope.$broadcast('populateSearch', newVal);
		}		
	});
	
	$scope.$watchCollection('filterList.context_type', function(newVal, oldVal){
		if(!angular.equals(newVal, oldVal)){	
			if($state.current.data.isContextType)
				$rootScope.$broadcast('contextTypeUpdated');
		}		
	});
	

	this.init();

}

function saveSearchController($scope, $modalInstance, apiService, apiUrl, notify, filterGroup) {

	var _this = this;
	
	$scope.ok = function() {
		_this.saveSearchFilter();
		$modalInstance.close();
	};
	
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
	
	/*
	 * To save search filter
	 */
	this.saveSearchFilter = function() {
		
		if($scope.filtername !== undefined)
			$scope.saveArgs.filtername = $scope.filtername;
		
		filterGroup.saveFilter($scope.saveArgs)
			.then(function(data) {
				if (data.status == "Failed") {
					notify({
						message : 'Error :- ' + data.message,
						classes : 'alert-danger',
						templateUrl : 'views/common/notify.html'
					});
				} else {
					notify({
						message : 'Success :- ' + data.message,
						classes : 'alert-success',
						templateUrl : 'views/common/notify.html'
					});
					$scope.searchObj.getSavedFilters();
				}
			}, function(error) {
				console.log('Save filter failed.')
			});
	}

};

/**
 * 
 * Pass all functions into module
 */
angular.module('cie').controller('EventSearchCtrl', EventSearchCtrl)
