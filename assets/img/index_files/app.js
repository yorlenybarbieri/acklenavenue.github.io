function loadScript(url, callback) {
	// Adding the script tag to the head as suggested before
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;

	// Then bind the event to the callback function.
	// There are several events for cross browser compatibility.
	script.onreadystatechange = callback;
	script.onload = callback;

	// Fire the loading
	head.appendChild(script);
}

angular.module('goodworks', ['ionic', 'google-maps']).run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});

}).run(function() {
	Parse.initialize("5RgWENbHI8NAHcMfpcLxgFR15N1T0tI8FqKmouVL", "BK3YZqkpLIsV0fX9KH1wBbIh6OpsvMld87Ss2ixB");

	ionic.Platform.ready(function() {
		var appID = "719227644786539";
		var device = ionic.Platform.device();
		try {
			openFB.init(appID);		
		} catch (e) {
			
		}
	});

}).config(function($stateProvider, $urlRouterProvider) {

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider

	// setup an abstract state for the tabs directive
	.state('tab', {
		url : "/tab",
		abstract : true,
		templateUrl : "templates/tabs.html"
	})

	// Each tab has its own nav history stack:

	.state('tab.dash', {
		url : '/dash',
		views : {
			'tab-dash' : {
				templateUrl : 'templates/tab-dash.html',
				controller : 'DashCtrl'
			}
		}
	}).state('tab.add-site', {
		url : '/add-site',
		views : {
			'tab-dash' : {
				templateUrl : 'templates/add-site.html',
				controller : 'AddSiteCtrl'
			}
		}
	}).state('tab.site-detail', {
		url : '/site/:siteId',
		views : {
			'tab-dash' : {
				templateUrl : 'templates/site-detail.html',
				controller : 'SiteDetailCtrl'
			}
		}
	}).state('tab.login', {
		url : '/login',
		views : {
			'login' : {
				templateUrl : 'templates/login.html',
				controller : 'LoginController'
			}
		}
	})

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/tab/login');

});

//angular.module('starter.controllers', []);
