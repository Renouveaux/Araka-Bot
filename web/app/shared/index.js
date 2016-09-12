'use strict';

angular.module('shared', [])
.factory('auth', require('./login/service') )
.directive('ngLogin', require('./login/directive') )
;