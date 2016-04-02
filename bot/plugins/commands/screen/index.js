module.exports = function(data, Config, Helpers) {

	Configs.findOne({ 'name' : 'screen' }, function (err, res) {

		let message;

		let user = Helpers.getCommandPart(data.message, '2');

		if(typeof user !== 'undefined' && user.match(/<@[0-9]+>/gi) != null){
			message = user + " -> " + res.url;
		}else{
			message = res.url;
		}

		Bot.sendMessage({
			'to': data.channelID,
			'message': message
		});

	});

	
};
