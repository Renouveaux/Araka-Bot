module.exports = function(data, Config, Helpers, Logger) {

	Configs.findOne({ 'name' : 'bit' }, function (err, res) {

		if(res !== null){

			var url = Helpers.getCommandPart(data.message, '2');

			var Bitly = require('bitly');
			var bitly = new Bitly(res.token);

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

	})


}