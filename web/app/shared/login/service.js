'use strict';

module.exports = function($rootScope, jwtHelper, authManager, $location){

	var self = this;

	self.saveToken = function(token, cb){

		var parts = token.split('.');

		if (parts.length !== 3) {
			return;
		}

		var exp = jwtHelper.decodeToken(token);
		if(!jwtHelper.isTokenExpired(token)){
			localStorage.setItem('arakaToken', token);
			$location.url('/')
		}else{
			$location.url('/login');
		}
	}	

	self.isAuth = function(){
		var token = getToken();
		if(token && !jwtHelper.isTokenExpired(token)){
			return true;
		}else{
			return false;
		}
	}

	self.logout = function(){
		localStorage.removeItem('arakaToken');
		$rootScope.$broadcast('unauthenticated');
	}

	this.getUserData = function(token){
		return jwtHelper.decodeToken(getToken());
	};


	return self;

}

var getToken = function(){
	return localStorage.getItem('arakaToken');
}