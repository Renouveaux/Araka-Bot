'use strict';

module.exports = function($scope, $state, auth){
	
	$scope.$state = $state;

	$scope.userData = auth.getUserData();

	$scope.menuItems = [];

	angular.forEach($state.get(), function (item) {
		if (item.data && item.data.visible) {
			$scope.menuItems.push({name: item.name, text: item.data.text});
		}
	});

}