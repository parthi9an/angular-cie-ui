(function() {
	angular.module('cie', [ 'ui.router', // Routing
	'ngSanitize', 'oc.lazyLoad', // ocLazyLoad
	'ui.bootstrap', // Ui Bootstrap
	'pascalprecht.translate', // Angular Translate
	'ngIdle', // Idle timer
	'ngClipboard', // Zero Clipboard
	'ngStorage',
	'datatables', 
	'datePicker',
	'angular.chosen',
	'cgNotify',
	'ngCookies',
	'am.multiselect',
	'oitozero.ngSweetAlert',
	'chart.js']).run([ '$anchorScroll', function($anchorScroll) {
		$anchorScroll.yOffset = 50; // always scroll by 50 extra pixels
	} ]).config(
			[ 'ngClipProvider', function(ngClipProvider) {
				ngClipProvider.setPath("js/plugins/zero-clipboard/ZeroClipboard.swf");
			} ]);
	// angular.module('showcase', [ 'datatables' ]);
})();

// Other libraries are loaded dynamically in the config.js file using the
// library ocLazyLoad
