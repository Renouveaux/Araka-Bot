/**
 * regroupe les différentes function faisant appel à la bdd
 * @param data
 * @param Bot
 * @param Config
 * @param Helpers
 */


 var plugins = require('node-require-directory')(__dirname);

 module.exports = function(data, Config, Helpers) {

 	Object.keys(plugins).forEach(function(key) {
 		if (key === 'index') {
 			return;
 		};
 		//require('./' + key)(data, Config, Helpers);

 	});

 }
