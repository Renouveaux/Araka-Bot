/**
 * Permet de filtrer un message et répondre en fonction
 * @param data
 * @param Bot
 * @param Config
 * @param Helpers
 */

 module.exports = function(data, Config, Helpers) {

 	if((data.message.match(/\n/g)||[]).length >= 5){
 		require('./code')(data, Config, Helpers);
 	}

 	// gain XP when writting message
 	require('./levels')(data, Config, Helpers);


 }
