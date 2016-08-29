module.exports = function(data, Config, Helpers, Logger) {

  var value = Helpers.getCommandPart(data.message, '2');

  if(Config.admin.indexOf(data.userID) == -1) {

    var message = '';

    message += '@';
    message += data.user;
    message += ' ';

    message += 'Vous n\'avez pas la permission d\'effectuer cette commande'

    Bot.sendMessage({
      'to': data.channelID,
      'message': message
    })

    Logger.log('warn', 'The user ' + data.user + ' with Id ' + data.userID + ' try to use the clean command');

    return;

  }

  if(typeof value !== 'undefined'){

    switch(value){
      case 'all' : 

        Bot.getMessages({
          channel: data.channelID,
          limit: 500000
        }, function(err, messageArr) {

          console.log(messageArr);

          Logger.log('err', 'Error on clean all command');

          for(var i=0; i < messageArr.length; i++){
            Bot.deleteMessage({
              channel: data.channelID,
              messageID: messageArr[i].id
            });
          }
        });

      break;

      default:

        Bot.getMessages({
          channel: data.channelID,
          limit: parseInt(value)
        }, function(err, messageArr) {

          Logger.log('err', 'Error on clean with ' + parseInt(value) + ' line');

          for (var i=0; i < messageArr.length; i++) { 

            Bot.deleteMessage({
              channel: data.channelID,
              messageID: messageArr[i].id
            });

          }

        });

      break;

    }

  }else{

    Bot.sendMessage({
      'to': data.userID,
      'message': 'merci de spécifier un paramètre'
    });


  }

};
