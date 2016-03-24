// Import bot librairie
import DiscordClient 	from 'discord.io';

// Import system utilities
import events 			from 'events';
import fs 				from 'fs-extra';
import PrettyError 		from 'pretty-error';
import Promise 			from 'promise';
import utilconsole 		from 'util-console.log';

// Import extra librairies
import PouchDB 			from 'pouchdb'; // Database
import winston 			from 'winston'; // Logger
import leveldown 		from 'leveldown';
import chalk 			from 'chalk';

// Import modules
import Events 			from './lib/events';
import Helpers 			from './lib/helpers';

// Initialiser external librairies
//utilconsole.configure();
console.log("initialise librairies");
PrettyError.start();
let Config = Helpers.getConfig(false);
let db = new PouchDB('dataBase', { db: leveldown });

// Winston init

var logger = new (winston.Logger)({
	transports: [
	new (winston.transports.Console)(),
	new (winston.transports.File)({ filename: '../application.log' })
	]
});

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