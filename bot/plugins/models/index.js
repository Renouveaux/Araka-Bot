var models = require('node-require-directory')(__dirname);
var mongoose = require('mongoose');

String.prototype.capitalizeFirstLetter = function(){
	return this.charAt(0).toUpperCase() + this.slice(1);
};

Object.keys(models).forEach(function(key) {
	if (key === 'index') {
		return;
	};
	var modelName = key.capitalizeFirstLetter();
	global[modelName] = mongoose.model(modelName, models[key]);
});

global.mongoose = mongoose;