var request = require('request');

request.del({
			url:'https://discordapp.com/api/oauth2/applications/165819965746708481', 
			headers: {
				Authorization: "ODY5NTI2ODEyNTEzMDc1MjA.CeBB4w.4-VkVYJuiHGoze1-DeX5miQOlWc"
			}}, function(err,httpResponse,body){

				console.log(body);

			});
