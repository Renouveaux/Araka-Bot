'use strict';

module.exports = function() {
	return {
		restrict : 'A',
		templateUrl : './app/shared/login/index.html',
		controller: require('./')
	};
};