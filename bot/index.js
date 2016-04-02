// Import bot librairie
import DiscordClient 	  from 'discord.io';

// Import system utilities
import events 			  from 'events';
import fs 				    from 'fs-extra';
import PrettyError 		from 'pretty-error';
import Promise 			  from 'promise';
import utilconsole 		from 'util-console.log';

// Import extra librairies
import mongoose 			from 'mongoose'; // Database
import winston 			  from 'winston'; // Logger
import chalk 			    from 'chalk';

// Import modules
import Events 			from './lib/events';
import Helpers 			from './lib/helpers';

// Initialiser external librairies
//utilconsole.configure();
console.log("initialise librairies");
PrettyError.start();
let Config = Helpers.getConfig(false);

// Winston init

var logger = new (winston.Logger)({
  transports: [
  new (winston.transports.Console)(),
  new (winston.transports.File)({ filename: '../application.log' })
  ]
});

let connectStr = Config.database.prefix + '://' + Config.database.host + ':' + Config.database.port + '/' + Config.database.base;
mongoose.connect(connectStr, {server:{auto_reconnect:true}});
let db = mongoose.connection;

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
import './plugins/models';

winston.handleExceptions(new winston.transports.File({ filename: '../exceptions.log' }))

debugger;

// Running bot instance
GLOBAL.Bot = new DiscordClient(Config.getConstructorConfig());
console.log("Connection initiated");

// Bot core initialisation

// What we do when Bot is ready (Connected)
Bot.on('ready', function(event){

	console.info('Connected');

	Events.init(Config, Helpers, logger)

	// TODO
	// Send event to client

});