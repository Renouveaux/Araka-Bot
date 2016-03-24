module.exports = function(data, Config, Helpers, Logger) {


	var url = Helpers.getCommandPart(data.message, '2');

	var Bitly = require('bitly');
	var bitly = new Bitly(Config.API.bitly.key);

	if(typeof url !== 'undefined'){

		bitly.shorten(url)
		.then(function(response) {
			var short_url = response.data.url;

			if(response.status_code == 500){

				Bot.sendMessage({
					'to': data.userID,
					'message': "Votre url ne semble pas valide."
				});	

			}else{

				bitly.linkEdit('title', short_url, data.user);

				Bot.sendMessage({
					'to': data.channelID,
					'message': short_url
				});
								
			}


		}, function(error) {
			Logger.log('err', 'Bitly error')
			throw error;
		});

	}else{
		Bot.sendMessage({
			'to': data.userID,
			'message': "Merci de spécifier une url à bitifier"
		});
	}

}