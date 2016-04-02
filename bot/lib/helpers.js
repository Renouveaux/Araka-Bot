'use strict';

import fs 			from 'fs-extra';

module.exports = {

	checkIsCommand : function(message){
		if(message.slice(0, this.getConfig().commandPrefix.length)[0] == this.getConfig().commandPrefix) 
			return true;

		return false;
	},

	getConfig: function(save) {

		let config = {};

		config = fs.readJsonSync('config-file.json', { throws: false }) || config;

		if(!config.token)
			throw new Error("Thanks to specify a token in your configuration file");

		config.admin = config.admin || [];
		config.autoReconnect = config.autoReconnect || false;
		config.commandPrefix = config.commandPrefix || '/';
		config.debug = config.debug || false;

		config.commandPrefix.replace(new RegExp(' ', 'g'), '')

		config.getConstructorConfig = function(autorun) {

			let constructorConfig = {};

			constructorConfig.email = config.email || null;
			constructorConfig.password = config.password || null;
			constructorConfig.token = config.token ||null;
			constructorConfig.autorun = config.autorun || false;

			return constructorConfig;

		};

		config.getApiConfig = function() {

			let apiConfig = {};

			apiConfig.api_dev_key = config.API.pastebin.key;
			apiConfig.api_user_name = config.API.pastebin.username;
			apiConfig.api_user_password = config.API.pastebin.password;

			return apiConfig;

		}

		if(save) {
			fs.writeJsonSync('./config-file.json', config);
		}

		return config;

	},

	getCommandPart: function(message, part) {

		message = message.replace(new RegExp(this.getConfig().commandPrefix), '');
		return message.split(' ')[part - 1];

	},

	commandExist: function(command, cb){

		Commands.findOne({ 'name': command }, function (err, data) {
			cb(err, data);
		})
		

	}

}


