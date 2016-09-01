/**
 * regroupe les différentes function faisant appel à la bdd
 * @param data
 * @param Bot
 * @param Config
 * @param Helpers
 */


 var plugins = require('node-require-directory')(__dirname);

 module.exports = function(Bot, userId, Config, Helpers) {

 	Object.keys(plugins).forEach(function(key) {
 		if (key === 'index') {
 			return;
 		};
 		require('./' + key)(Bot, userId, Config, Helpers);
 	});

 }
