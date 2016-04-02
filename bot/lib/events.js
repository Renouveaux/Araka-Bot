'use strict';

/*
This include all events when something happen on discord chat.
*/

import onCommands from '../plugins/commands';
import onMessages from '../plugins/messages';
import onPresence from '../plugins/presence';

let State = {
	'connected': true,
	'connection': false,
	'disconnection': false
}

module.exports = {

	init : function(Config, Helpers, Logger){

		// Bot received error
		Bot.on('err', function(e){
			Logger.log('error', e);
			throw new Error(e);
		});

		// The bot was disconnected (probably discord server down)
		Bot.on('disconnected', function(){

			Logger.log('error', 'The bot was disconnected from the server');

			if (State.disconnection == true)
				return;

			if (Config.autoReconnect != true)
				return;

			State.connected = false;
			State.connection = true;

			Bot.connect();

		});


		// Show any websocket message sent client (work if debug set to true in config file)
		Bot.on('debug', function(rawEvent) {

			if (!Config.debug)
				return;

			console.log('debug:','\n', rawEvent);

		});


		// All messages sent appears here
		// user : The user's name.
		// userID : The user's ID.
		// channelID : The ID of the room where the bot received the message.
		// message : The chat message.
		Bot.on('message', function(user, userID, channelID, message, rawEvent) {

			if (userID == Bot.id)
				return;

			let data = {
				'user': user,
				'userID': userID,
				'channelID': channelID,
				'message': message,
				'rawEvent': rawEvent
			}


			if (Helpers.checkIsCommand(message)){

				let key = Helpers.getCommandPart(message, '1');

				Bot.deleteMessage({
					channel: channelID,
					messageID: rawEvent.d.id
				}, function(err){

					if(err){
						Logger.log('error', "Error on deleting message");
					}

					Helpers.commandExist(key, function(err, res){

						if(err) 
							return false;

						if(res !== null && res.active){

							if(res.adminCommand && Config.admin.indexOf(userID) == -1) {				

								let message = `@${user} Vous n\'avez pas la permission d\'effectuer cette commande`;

								Bot.sendMessage({
									'to': userID,
									'message': message
								})

								return;

							}

							if(res.fctn){


								onCommands(data, Config, Helpers, Logger);

							}else{

								let channel = !res.private ? channelID : userID;

								Bot.sendMessage({
									'to': channel,
									'message': res.message
								});

							}

						}


					});

				});


			}else{
				onMessages(data, Config, Helpers, Logger);
			}


		});

		// Event when user change presence status
		Bot.on('presence', function(user, userID, channelID, message, rawEvent){

			let data = {
				'user': user,
				'userID': userID,
				'channelID': channelID,
				'message': message,
				'rawEvent': rawEvent
			}
			
			onPresence(data, Config, Helpers, Logger);
		})


	}
	

}