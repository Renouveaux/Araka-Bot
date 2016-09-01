'use strict';

/*
This include all events when something happen on discord chat.
*/
var onCommands 		= require('../plugins/commands');
var onMessages 		= require('../plugins/messages');
var onPresence 		= require('../plugins/presence');

var State = {
	'connected': true,
	'connection': false,
	'disconnection': false
}

module.exports = {

	init : function(Bot, Config, Helpers, Logger){

		// Bot received error
		Bot.on('err', function(e){
			Logger.log('error', e);
			throw new Error(e);
		});

		// The bot was disconnected (probably discord server down)
		Bot.on('disconnected', function(){
			Logger.log('error', 'The bot was disconnected from the server');
		});


		// Show any websocket message sent client (work if debug set to true in config file)
		Bot.on('debug', function(rawEvent) {
			if (!Config.debug)
				return;
			console.log('debug:','\n', rawEvent);
		});


		Bot.on('message', function(msg) {

			if (msg.content.startsWith(Helpers.getConfig().commandPrefix)){

				var cmd = msg.content.split(" ")[0].replace(/\n/g, " ").substring(Helpers.getConfig().commandPrefix.length).toLowerCase();
				var suffix = msg.content.replace(/\n/g, " ").substring(cmd.length + 2).trim();
				var params = msg.cleanContent.substring(msg.cleanContent.indexOf(" ") + 1).split(/, ?/);

				msg.delete(1000, function(err){
					if(err){
						console.log(err)
						Logger.log('error', "Error on deleting message");
					}

					Helpers.commandExist(cmd, function(err, res){
						if(err) 
							return false;

						if(res !== null && res.active){
							if(res.adminCommand && Config.admin.indexOf(msg.sender.id) == -1) {
								Bot.sendMessage(msg.author, 'Vous n\'avez pas la permission d\'effectuer cette commande');
								return;
							}

							if(res.fctn){
								onCommands(Bot, cmd, params, msg, Config, Helpers, Logger);
							}else{
								var channel = !res.private ? msg : msg.author;
								Bot.sendMessage(channel, res.message);
							}
						}
					});
				});
			}else{
				onMessages(Bot, Config, Helpers, Logger);
			}

		});

		// Event when user change presence status
		Bot.on('presence', function(o, n){
			onPresence(Bot, o, n);
		})


	}
	

}