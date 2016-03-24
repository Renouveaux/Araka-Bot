module.exports = function(data, Config, Helpers, Logger) {

  if (!data)
    throw new Error('\'data\' doesn\'t exist.');

  if (!data.user)
    throw new Error('No username defined');

  if (!data.userID)
    throw new Error('No user id defined.');

  if (!data.channelID)
    throw new Error('No channel id defined.');

  if (!data.rawEvent)
    throw new Error('No \'rawEvent\' defined.');

  var key = Helpers.getCommandPart(data.message, '1');

  require('./' + key)(data, Config, Helpers, Logger);


};