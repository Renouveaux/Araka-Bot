// Import bot librairie
var Discord = require('discord.js');

// Import system utilities
var events        = require('events');
var fs            = require('fs-extra');

// Import extra librairies
var mongoose      = require('mongoose');
var winston       = require('winston');
var chalk         = require('chalk');

// Import modules
var Events        = require('./lib/events');
var Helpers       = require('./lib/helpers');

// Initialiser external librairies
console.log("initialise librairies");
var Config = Helpers.getConfig(false);

// Winston init

var logger = new (winston.Logger)({
  transports: [
  new (winston.transports.Console)(),
  new (winston.transports.File)({ filename: '../application.log' })
  ]
});

mongoose.connect(Config.database.host + ':' + Config.database.port + '/' + Config.database.base, {
  db: { native_parser: true },
  user: Config.database.user || null,
  pass: Config.database.pass || null
});

var db = mongoose.connection;
/**
  *
  * Listen the database status
  *
  */
mongoose.connection.on('opening', function() {
  logger.verbose("reconnecting... %d", mongoose.connection.readyState);
});
db.once('open', function callback () {
  logger.verbose("Database connection opened.");
});
db.on('error', function (err) {
  logger.debug("DB Connection error %s", err);
});
db.on('reconnected', function () {
  logger.verbose('MongoDB reconnected!');
});
db.on('disconnected', function() {
  logger.debug('MongoDB disconnected!');
  mongoose.connect(connectStr, {server:{auto_reconnect:true}});
});

// Bootstrap Models
require('./plugins/models');

winston.handleExceptions(new winston.transports.File({ filename: '../exceptions.log' }))

debugger;

// Running bot instance
var Bot = new Discord.Client();
console.log("Connection initiated");

// Bot core initialisation

// What we do when Bot is ready (Connected)
Bot.on('ready', function(){

	console.info('Connected');
	Events.init(Bot, Config, Helpers, logger)

});

Bot.loginWithToken(Config.getConstructorConfig().token);