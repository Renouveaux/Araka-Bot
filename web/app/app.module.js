'use strict';

require('angular/angular');
var Snap = require('snapjs');
require('angular-snap');
require('angular-ui-router');
require('angular-animate');
require('angular-jwt');
window.Snap = Snap;


require('./shared');
require('./components');


angular.module('ArakaAdmin', ['ui.router', 'snap', 'ngAnimate', 'angular-jwt', 'shared', 'components'])
.config( require('./app.route') )
.run( require('./app.init') )
.controller('AppController', require('./app.controller'))
;