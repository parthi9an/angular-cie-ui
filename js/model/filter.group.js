var FilterGroup = function ($q , conf, apiUrl, $http ) {
	
    var filter =  {
    	filterList: {},
    	selectedFilter : {},
    	getFilterList: getFilterList,
    	loadFilterList : loadFilterList,
    	setSelectedFilter : setSelectedFilter,
    	getSelectedFilter : getSelectedFilter,
    	clearSelectedFilter : clearSelectedFilter,
    	getSavedFilterList : getSavedFilterList,
    	deleteFilter : deleteFilter,
    	deleteAllFilter : deleteAllFilter,
    	saveFilter : saveFilter,
    };
  
    return filter;
    
    function setSelectedFilter(list){
    	filter.selectedFilter = list;
    }
    
    function getSelectedFilter(){
    	return filter.selectedFilter;
    }
    
    function clearSelectedFilter(){
    	filter.selectedFilter = {};
    }
    
    function getFilterList(){
    	return filter.filterList;
    }
  
    function loadFilterList(args) {
        var def = $q.defer();
        var url = conf.apiBaseUrl + '/' + apiUrl.GET_FILTERS;
        $http.post(url, args)
            .success(function(data) {
            	filter.filterList = data;
            	for (var key in filter.selectedFilter) {
            		if(Array.isArray(filter.selectedFilter[key]) && filter.selectedFilter[key].length > 0 && (typeof filter.filterList[key] !== 'undefined' &&
            				!(filter.selectedFilter[key].every(function(element, index) {	return (filter.filterList[key].indexOf(element) > -1);})))) {
            				filter.selectedFilter[key] = $.arrayIntersect(filter.filterList[key],filter.selectedFilter[key]);
            		}            		
            	}
                def.resolve(data);
            })
            .error(function() {
                def.reject("Failed to get Filter list");
            });
        return def.promise;
    }
    
    function getSavedFilterList(args) {
        var url = conf.apiBaseUrl + '/' + apiUrl.GET_SAVED_FILTERS +''+ formUrlParams(args);
        return $http.get(url ,args).then(function (info) {
            for (var i = 0; i < info.data.result.length; i++){
            	info.data.result[i].source = JSON.parse(info.data.result[i].source);
            	info.data.result[i].version = JSON.parse(info.data.result[i].version);
            	info.data.result[i].session_id = JSON.parse(info.data.result[i].session_id);
            	info.data.result[i].server_id = JSON.parse(info.data.result[i].server_id);
            	info.data.result[i].user_id = JSON.parse(info.data.result[i].user_id);
			 }
            return info.data;
        } , function (error) {
            return $q.reject(error);
        }); 
    }
    
    function deleteFilter(args) {
        var url = conf.apiBaseUrl + '/' + apiUrl.DELETE_RECORD +''+ formUrlParams(args);
        return $http.get(url).then(function (info) {
            return info.data;
        } , function (error) {
            return $q.reject(error);
        });        
    }
    
    function deleteAllFilter(args) {
        var url = conf.apiBaseUrl + '/' + apiUrl.DELETE_ALL_FILTERS +''+ formUrlParams(args);
        return $http.get(url ,args).then(function (info) {
            return info.data;
        } , function (error) {
            return $q.reject(error);
        });
    }
    
    function saveFilter(args) {
    	var def = $q.defer();
        var url = conf.apiBaseUrl + '/' + apiUrl.SAVE_SEARCH_FILTER;
        $http.post(url, args)
            .success(function(data) {
                def.resolve(data);
            })
            .error(function() {
                def.reject("Failed to save filter");
            });
        return def.promise;    
    }
    
};

angular.module('cie').factory("filterGroup" , FilterGroup);