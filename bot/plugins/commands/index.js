module.exports = function(Bot, cmd, params, msg, Config, Helpers, Logger) {

  require('./' + cmd)(Bot, params, msg, Config, Helpers, Logger);

};