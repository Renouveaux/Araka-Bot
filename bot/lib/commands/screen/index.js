module.exports = function(data, Config, Helpers) {

	let message;

	let user = Helpers.getCommandPart(data.message, '2');

	if(typeof user !== 'undefined' && user.match(/<@[0-9]+>/gi) != null){
		message = user + " -> " + Config.global.screen;
	}else{
		message = Config.global.screen;
	}

	Bot.sendMessage({
		'to': data.channelID,
		'message': message
	});
	
};
