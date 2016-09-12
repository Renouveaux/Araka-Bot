'use strict';

module.exports = function($stateProvider, $urlRouterProvider, snapRemoteProvider, jwtOptionsProvider, $httpProvider){

	// Désactive le snap de manière global par la droite
	snapRemoteProvider.globalOptions.disable = 'right';

	// Route par défaut si non existante
	$urlRouterProvider.otherwise("/");

	$stateProvider.state('dashboard', {
		url: '/',
		templateUrl: "app/components/dashboard/index.html",
		controller: require('./components/dashboard/'),
		data: {text: "Dashboard", visible: true } 
	});

	$stateProvider.state('levels', {
		url: '/levels',
		templateUrl: "app/components/dashboard/index.html",
		controller: require('./components/dashboard/'),
		data: {text: "Rank", visible: true } 
	});

	$stateProvider.state('logout', {
		url: '/logout',
		controller: require('./shared/login/'),
		data: {text: "Logout", visible: true}
	})

	$stateProvider.state('profile', {
		url: '/profile?access_token',
		controller: require('./shared/login/'),
		data: {text: "Plugins", visible: false } 
	});

	// Configure Angular JWT
	jwtOptionsProvider.config({
		loginPath : '/',
		unauthenticatedRedirectPath : '/login',
		tokenGetter: [function(){
			return localStorage.getItem('arakaToken');
		}]
	});

	$httpProvider.interceptors.push('jwtInterceptor');


}