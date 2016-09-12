'use strict'; 

module.exports = function($rootScope, $location, jwtHelper, authManager, auth){

	// Vérifie si le client possède un token
	authManager.checkAuthOnRefresh();

	authManager.redirectWhenUnauthenticated();	

};