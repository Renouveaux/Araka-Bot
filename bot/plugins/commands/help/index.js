var multiline = require('multiline.js');

module.exports = function(Bot, params, msg, Config, Helpers, Logger) {

  var prefix = Config.commandPrefix;

  var response = `
  Le prefix de commande actuel est ${prefix}

  Voici la liste de mes commandes disponibles;
  ${prefix}help : Affiche cette aide.
  ${prefix}sms : Alerte un utilisateur que le langage sms est prohibé
  `;

  Bot.sendMessage(msg.author, response);

};
