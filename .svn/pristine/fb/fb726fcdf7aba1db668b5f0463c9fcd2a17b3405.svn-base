/**
 * Dashboard Controller
 */

function DashboardCtrl($scope, apiUrl, apiService, $compile, $http, DTOptionsBuilder,
		DTColumnDefBuilder,DTColumnBuilder, filterGroup) {

	var _this = this;

	this.minRange = 2;

	this.maxRange = 20;
	
	this.exceptionPatternData = [];
	
	$scope.dtEventOptions = 
		   DTOptionsBuilder.newOptions()
	   		.withOption('ajax', {
	   			dataSrc: "data",
	   			url: apiService.buildUrl(apiUrl.GET_ALL_EVENT),
	   			type:"POST",
	   			headers: {
	   	   			'Access-Token':$http.defaults.headers.common['Access-Token']
	   			},
	   			data: { filter : JSON.stringify(filterGroup.getSelectedFilter()) },
	   			error: function( jqXhr, textStatus, errorThrown ){
	              console.log( errorThrown );
	            }
			})    					
			.withOption('processing', true) //for show progress bar
			.withOption('serverSide', true) // for server side processing
			.withPaginationType('full_numbers') // for get full pagination options // first / last / prev / next and page numbers
		    .withDisplayLength(10) // Page size
		    .withOption('searchDelay',2000);
	
	$scope.dtEventColumns = [
	      DTColumnBuilder.newColumn("metric_timestamp", "Date").withTitle('Date').renderWith(function(data, type, full) {
	    	  return new Date(parseInt(full.metric_timestamp)).format("yyyy-mm-dd HH:MM:ss l");
          }).withOption('sWidth' , '20%').notSortable(),
	      DTColumnBuilder.newColumn("metric_type", "Name").withTitle('Name').withOption('sWidth' , '10%').notSortable(),
	      DTColumnBuilder.newColumn("event_details", "Details").withTitle('Details').withOption('sWidth' , '70%')
	      	.renderWith(function(data, type, full) {	                    	
	      		var html = "<span style=\"word-break: break-all;\">";
	      		for (var k1 in data){
	      			html+="<span> <b>"+ k1 + "</b> </span>";
	                if (typeof data[k1] === 'object') {
	                   	html+="<span style=\"color: blue;\">";
	                   	for (var k2 in data[k1]){
	                   		html+="<span> <b>"+ k2 + "</b> </span>";
	                   	    if(typeof data[k1][k2] === 'object'){
	                   	    	for(var k3 in data[k1][k2]){
	                   	    		html+="<span>&nbsp;[&nbsp; <b>"+ k3 + "</b> </span><span>"+ data[k1][k2][k3] + "&nbsp;]&nbsp;</span>";
	                   	    	}
	                   	    } else {
	                   	    	html+="<span> "+ data[k1][k2] + "&nbsp;|&nbsp;</span>";
	                   	    }	                    	    		
	                   	}
	                   	html+="</span>"
	                } else{
	                   	html+="<span> "+ data[k1] + "&nbsp;|&nbsp;</span>";
	                }
	            }
	            html+="</span>"
	            return html;
	         }).notSortable()];

	
	this.init = function() {

		var args = filterGroup.getSelectedFilter();

		_this.getOverAllSummary();
		_this.getFrequentEventPattern(args);
		_this.getExceptionCount(args);

	}

	/*
	 * Search filter (in progress)
	 */
	$scope.$on('populateSearch', function(event, args) {
		
		_this.getFrequentEventPattern(args);
		_this.getExceptionCount(args);
		$scope.dtEventOptions = 
			   DTOptionsBuilder.newOptions()
		   		.withOption('ajax', {
		   			dataSrc: "data",
		   			url: apiService.buildUrl(apiUrl.GET_ALL_EVENT),
		   			type:"POST",
		   			headers: {
		   	   			'Access-Token':$http.defaults.headers.common['Access-Token']
		   			},
		   			data: { filter : JSON.stringify(filterGroup.getSelectedFilter()) },
		   			error: function( jqXhr, textStatus, errorThrown ){
		              console.log( errorThrown );
		            }
				})    					
				.withOption('processing', true).withOption('serverSide', true);

	});

	/*
	 * Returns the count of event
	 */

	this.getCount = function(key) {
		return (_this.summaryData == null || _this.summaryData[key] == undefined) ? 0
				: _this.summaryData[key].count;
	}

	/*
	 * Get overall summary of Events(count)
	 */

	this.getOverAllSummary = function() {
		apiService.get(apiUrl.GET_OVERALL_SUMMMARY, function(data, status) {
			_this.summaryData = data;
		});
	}
	
	/*
	 * Get patterns of actions that commonly occur consecutively.
	 * 
	 */

	this.getFrequentEventPattern = function(args) {
	
		apiService.post(apiUrl.GET_FREQUENT_EVENT_PATTERN, args,
				function(data, status) {

					for (var i = 0; i < data.length; i++) {
						data[i].eIds = data[i].pattern.replace(/#/g, '').split(
								'_');
						data[i].eNames = data[i].pattern_class.split('_');
					}
					$scope.eventPatternData = data;

				});

	}

	this.toogleEventPattern = function(index, e) {
		var el = e.replace(':', '_');
		$("#pattern" + index + "_" + el).find('.elements').toggle();
		if ($("#pattern" + index + "_" + el).find('.elements').is(":visible")) {
			_this.loadEventPatternElements(index, el);
		}
		return false;
	}

	/*
	 * Get Event details
	 */

	this.loadEventPatternElements = function(index, id) {
		var args = {};
		args['rid'] = id.replace('_', ':');
		var html;
		var element = $("#pattern" + index + "_" + id).find('.elements');

		apiService.getWithParams(apiUrl.GET_EVENT_DETAIL, args, function(data,
				status) {

			html = "<table class='table table-bordered'>";
			for ( var key in data) {
				var value = data[key];
				html += "<tr><td>" + key + "</td>";
				if(typeof value === 'object') {
					html += "<td style='word-break: break-all;'>"
					for(var key2 in value) {
						var value2 = value[key2];
						html += "<b>" + key2 + "</b>" + " : ";
						if(typeof value2 === 'object'){
							for(var key3 in value2){
								var value3 = value2[key3];
								html += "[ <b>" + key3 + "</b>" + " : " + value3 +" ] ";
							}
						} else {
							html +=  value2 +" ";
						}						
					}
					html += "</td></tr>"; 
				} else {
					html += "<td style='word-break: break-all;'>" + value + "</td></tr>";
				}
				
			}
			html += "</table>";
			element.html(html);

		});

	}

	/*
	 * Get common patterns and actions leading up to the exception
	 */

	this.getFrequentExceptionPattern = function(index, exception) {
		$("#excep" + index).find('.excepElements').toggle();
		if ($("#excep" + index).find('.excepElements').is(
				":visible")) {
			var args = {};
			angular.copy(filterGroup.getSelectedFilter(), args);
			args['errorTracechecksum'] = exception.checksum;
			apiService.post(apiUrl.GET_FREQUENT_EXCEPTION_PATTERN, args,
				function(data, status) {
				
					for (var i = 0; i < data.length; i++) {
						data[i].eIds = data[i].pattern.replace(/#/g, '').split(
								'_');
						data[i].eNames = data[i].pattern_class.split('_');
					}
					_this.exceptionPatternData[index] = data;

				});
		}
	}

	/*
	 * Get common exception patterns along with: Counts on how frequently they
	 * occur
	 */

	this.getExceptionCount = function(args) {
		
		apiService.post(apiUrl.GET_EXCEPTION_COUNT, args, function(
				data, status) {
			var regex = /\(([A-Z][^:\)]+:\d+)\)/g;

			for (var i = 0; i < data.length; i++) {
				data[i].sTrace = [];
				if (data[i].trace.match('\\[') != null) {
					data[i].sTrace = angular.fromJson(data[i].trace);
				} else {
					data[i].sTrace.push(data[i].trace);
				}
				var match = data[i].trace.match(regex);
				if (match != null) {
					data[i].message += "[" + match.join(", ") + "]";
				}

			}
			$scope.exceptionData = data;

		});

	}
	
	/*
	 * Range Filter
	 */
	angular.element(document).ready(
			function() {

				var track = function(data) {
					//console.log(data);
					_this.minRange = data.fromNumber;
					_this.maxRange = data.toNumber;
					var $scopeRe = angular
							.element($("#patternRangeFilterData")).scope();
					$compile($scopeRe);
					$scopeRe.$apply();
				};
				$("#patternRange").ionRangeSlider({
					type : "double",
					min : 1,
					max : 20,
					from : 2,
					to : 20,
					step : 1,
					onStart : track,
					onChange : track,
					onFinish : track,
					onUpdate : track
				});
			});
	
	this.init();
	
}

/**
 * 
 * Pass all functions into module
 */
angular.module('cie').controller('DashboardCtrl', DashboardCtrl);