/**
 * INSPINIA - Responsive Admin Theme
 * 
 * Inspinia theme use AngularUI Router to manage routing and views Each view are
 * defined as state. Initial there are written state for all view in theme.
 * 
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $httpProvider, IdleProvider, KeepaliveProvider) {

    // Configure Idle settings
    IdleProvider.idle(5); // in seconds
    IdleProvider.timeout(120); // in seconds

    $urlRouterProvider.otherwise("/dashboard");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });
    
    //Interceptors
    $httpProvider.interceptors.push('authInterceptor');

    $stateProvider
        
    	.state('login', {
    		url: "/login",
    		templateUrl: "views/login.html",
    		data: { pageTitle: 'Login' },
    	})
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "views/dashboard.html",
            data: { pageTitle: 'Dashboard', isContextType : false },
           
        })
        .state('user', {
            url: "/user",
            templateUrl: "views/user.html",
            data: { pageTitle: 'User', isContextType : false }
        })
        .state('domain', {
            url: "/domain",
            templateUrl: "views/domain.html",
            data: { pageTitle: 'Domain', isContextType : false }
        })
        .state('inprogress', {
            url: "/inprogress",
            templateUrl: "views/inprogress.html",
            data: { pageTitle: 'Inprogress', isContextType : false }
        })
        .state('tool_action', {
            url: "/tool_action",
            templateUrl: "views/toolevent/action.html",
            data: { pageTitle: 'Action', isContextType : true }
        })
        .state('tool_view', {
            url: "/tool_view",
            templateUrl: "views/toolevent/view.html",
            data: { pageTitle: 'View', isContextType : false }
        })
        .state('tool_keyb', {
            url: "/tool_keyb",
            templateUrl: "views/toolevent/keyboard.html",
            data: { pageTitle: 'Keyboard', isContextType : true }
        })
        .state('tool_error', {
            url: "/tool_error",
            templateUrl: "views/toolevent/error.html",
            data: { pageTitle: 'Error', isContextType : false }
        })
        .state('tool_window_resize', {
            url: "/tool_window_resize",
            templateUrl: "views/toolevent/window_resize.html",
            data: { pageTitle: 'Window Resize', isContextType : true }
        })
        .state('tool_window_scroll', {
            url: "/tool_window_scroll",
            templateUrl: "views/toolevent/window_scroll.html",
            data: { pageTitle: 'Window Scroll', isContextType : true }
            
        })
        .state('tool_config', {
            url: "/tool_config",
            templateUrl: "views/toolevent/config.html",
            data: { pageTitle: 'Configuration', isContextType : false }
        })
        .state('tool_env', {
            url: "/tool_env",
            templateUrl: "views/toolevent/environment.html",
            data: { pageTitle: 'Environment', isContextType : false }
        })
        .state('app', {
            abstract: true,
            url: "/app",
            templateUrl: "views/common/content.html",
        });

}
angular
    .module('cie')
    .config(config)
    .run(['$rootScope', '$location', '$cookieStore', '$http', '$state', function ($rootScope, $location, $cookieStore, $http, $state) {
     // keep user logged in after page refresh
    	$rootScope.$state = $state;
    	$rootScope.globals = $cookieStore.get('globals') || {};
    	if ($rootScope.globals.currentUser) {
    		$http.defaults.headers.common['Access-Token'] = $rootScope.globals.currentUser.authdata; 
    	}
		
    	$rootScope.$on('$locationChangeStart', function (event, next, current) {
    		// redirect to login page if not logged in
    		if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
    			$location.path('/login');
    		}
    	});

 }]);
