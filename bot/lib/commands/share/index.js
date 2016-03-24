module.exports = function(data, Config, Helpers) {

	let message;

	let user = Helpers.getCommandPart(data.message, '2');

	request(Config.global.share, function (error, response, body) {
		if (!error && response.statusCode == 200) {

			if(typeof user !== 'undefined' && user.match(/<@[0-9]+>/gi) != null){
				message = user + " -> " + response.request.href;
			}else{
				message = response.request.href;
			}

			Bot.sendMessage({
				'to': data.channelID,
				'message': message
			});

		}else{

			if(typeof user !== 'undefined' && user.match(/<@[0-9]+>/gi) != null){
				message = user + " -> " + Config.global.paste;
			}else{
				message = Config.global.paste;
			}

			Bot.sendMessage({
				'to': data.channelID,
				'message': message
			});

		}
	});

};

import request from 'request';