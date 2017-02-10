/*
 * Filters
 */

angular.module('cie').filter("removeClusterInfo", function() {
	return function(data) {
		return data.replace(':', '_');
	};
});

angular.module('cie').filter(
		"eventIcon",
		function() {
			return function(name) {
				var html = "<span class='fa-stack'>";
						
				var icon = (name.match('KeyBoardEvent')) ? "fa-keyboard-o" 
						: (name.match('ActionEvent')) ? "fa-cogs"
						: (name.match('ViewEvent')) ? "fa-eye" 
						: (name.match('ErrorEvent')) ? "fa-times-circle" 
						: (name.match('ConfigurationEvent')) ? "fa-wrench" 
						: (name.match('WindowEvent')) ? "fa-expand" 
						: (name.match('WindowScrollEvent')) ? "fa-arrows"
						: (name.match('EnvironmentEvent')) ? "fa-cubes" 
						: (name.match('DomainEvent')) ? "fa-globe" 
						: (name.match('FieldEvent')) ? "fa-tags" 
						: "fa-square";
				var event = name.split(';');
				if(icon.match('fa-expand') || icon.match('fa-arrows')){
					html += "<i class='fa fa-square-o fa-stack-2x'></i>"
				} 
				html += "<i class='fa " + icon + " fa-stack-1x'></i></span>" + event[1];
				return html;

			};
		});