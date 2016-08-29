var request = require('request');

module.exports = function(data, Config, Helpers) {

	Configs.findOne({ 'name' : 'share' }, function (err, res) {

		var message;

		var user = Helpers.getCommandPart(data.message, '2');

		request(res.url, function (error, response, body) {
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
					message = user + " -> " + res.fallback;
				}else{
					message = res.fallback;
				}

				Bot.sendMessage({
					'to': data.channelID,
					'message': message
				});

			}
		});

	});



};