
angular.module('cie').service('apiService', function($http, conf) {

	var config = {
		headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		}
	};

	this.buildUrl = function(url) {
		url = url.charAt(0) == '/' ? url.substr(1) : url;
		if (conf.env == 'mockup') {
			url = url.replace('/', '!');
			url += '.json';
		}
		url = conf.apiBaseUrl + '/' + url;
		return url;
	}

	this.get = function(url, success, error) {
		url = this.buildUrl(url);
		$http.get(url).success(success).error(function(data, status, headers, config) {
			
		});

	}

	this.getWithParams = function(url, args, success, error) {
		url = this.buildUrl(url);
		url += formUrlParams(args);
		$http.get(url).success(success).error(function(data, status, headers, config) {
			
		});

	}

	this.post = function(url, data, success, error) {
		url = this.buildUrl(url);
		$http.post(url, data, {headers: {
				'Content-Type' : 'application/json;charset=UTF-8'
			}
		}).success(success).error(function(data, status, headers, config ) {
			if (error) {
				error.call(data, status);
			}
		});

	}

	this.postWithFormdata = function(url, fd, data, success, error) {
		url = this.buildUrl(url);
		url += formUrlParams(data);
		$http.post(url, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).success(success).error(function(data, status, headers, config){
       
        });

	}

});