'use strict';

module.exports = function($scope, $stateParams, $state, auth){

	if($stateParams.access_token){
		auth.saveToken($stateParams.access_token);
	}

	if($state.current.name === 'logout'){
		auth.logout();
	}

}