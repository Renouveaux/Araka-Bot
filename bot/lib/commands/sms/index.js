 module.exports = function(data, Config, Helpers) {

	var user = Helpers.getCommandPart(data.message, '2');

	if(typeof user !== 'undefined' && user.match(/<@[0-9]+>/gi) != null){
		Bot.sendMessage({
			'to': data.channelID,
    		'message': user + " -> " + "*Hey vous ne payez pas au mot, alors pas besoin d'écrire en abrégé ^^*"
    	});
	}else{
		Bot.sendMessage({
			'to': data.channelID,
			'message': "*Hey vous ne payez pas au mot, alors pas besoin d'écrire en abrégé ^^*"
		});
	}

};