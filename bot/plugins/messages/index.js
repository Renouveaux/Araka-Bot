/**
 * Check in database if plugin exist and if he is activate
 * @param data
 * @param Bot
 * @param Config
 * @param Helpers
 */

 module.exports = function(Bot, data, Config, Helpers) {
 	var dir = require('node-require-directory')(__dirname);

 	Object.keys(dir).forEach(function(key) {
 		if (key === 'index') {
 			return;
 		};

 		Messages.findOne({ 'name' : key }, function (err, res) {
 			if(res !== null && res.active){
 				//require('./' + key)(Bot, data, Config, Helpers);
 			}
 		})

 	});

 }