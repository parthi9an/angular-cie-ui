var _app = angular.module('cie');

_app.constant('conf', {
     'apiBaseUrl' : 'http://localhost:8090/jactal/TUI', 
	//'apiBaseUrl' : 'http://192.168.0.112:8080/jactal/TUI',
//    'apiBaseUrl' : 'http://159.203.128.65:8080/jactal/TUI',
    'version' : 1.0,
    'env' : 'prod'
});

_app.constant('apiUrl', {
	'GET_OVERALL_SUMMMARY' 	: 'getOverAllSummary', 
	'GET_ALL_EVENT' 	: 'getAllEvent',
	'GET_FILTERS' : 'getFilters',
	'GET_SESSIONS' 	: 'getSessions',
	'GET_SOURCES' 	: 'getSource',
	'GET_VERSIONS' 	: 'getVersions',
	'GET_DOMAINS' 	: 'getDomains',
	'GET_SERVERS' 	: 'getServers',
	'GET_ACTION_NAMES' 	: 'getActionNames',
	'GET_COUNT_OF_ACTION_KEY' 	: 'getActionKeyCount',
	'GET_COMMAND_COUNT_OF_ACTION' 	: 'getCommandCountOfActions',
	'GET_COMMAND_COUNT_BY_INVOKED' 	: 'getCommandCountByInvoked',
	'GET_COUNT_OF_MOVED_WINDOW' 	: 'getCountOfMovedWindows',
	'GET_COUNT_OF_SCROLL_WINDOW' 	: 'getCountOfScrollWindows',
	'GET_COUNT_OF_LOGIN_USER' 	: 'getCountOfLoginUser',
	'GET_COUNT_OF_USERS' 	: 'getCountOfUsers',
	'GET_COUNT_OF_SESSIONS' 	: 'getCountOfSessions',
	'GET_OVERRIDDEN_CONFIG_COUNT' 	: 'getOverridenConfigCount',
    'GET_VIEW_COUNT' 	: 'getViewCount',
    'GET_VIEW_ACTIVITY' 	: 'getViewActivity',
    'GET_ENV_PROPERTIES' 	: 'getEnvProperties',
    'GET_ENV_BREAKDOWN' 	: 'getEnvBreakdown',
    'GET_EXCEPTION_COUNT' : 'getExceptionCount',
    'GET_FREQUENT_EVENT_PATTERN': 'getCommonlyUsedPatterns',
    'GET_FREQUENT_EXCEPTION_PATTERN': 'getCommonExceptionPatterns',
    'GET_EVENT_DETAIL': 'getEventDetails',
    'SAVE_SEARCH_FILTER' : 'saveFilterCriteria',
    'GET_SAVED_FILTERS' : 'getSavedFilterCriteria', 
    'DELETE_ALL_FILTERS' : 'deleteAllFilters',
    'DELETE_RECORD' : 'deleteRecord',
    'LOGIN' : 'authenticate'
    
    
});