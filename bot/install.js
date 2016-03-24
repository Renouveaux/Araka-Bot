/*
First, initialise the bdd with available commands
*/

import PouchDB from 'pouchdb';

let commands = new PouchDB('dataBase/commands');

commands.put({
	"_id" : "bit",
	"description" : "Use bit to bitify a url, must be in canonical format",
	"cooldown" : 10,
	"function" : true,
	"private" : false,
	"deleteCommand" : true,
	"error" : "You url must be in canonical format like http://www.domain.com",
	"adminCommand" : false,
	"active" : false
});

commands.put({
	"_id" : "clean",
	"description" : "Delete a number of message or all chan",
	"cooldown" : 10,
	"function" : true,
	"deleteCommand" : true,
	"error" : "You must specify a parameter",
	"adminCommand" : true,
	"active" : false
});

commands.put({
	"_id" : "help",
	"description" : "Return all commands",
	"cooldown" : 10,
	"function" : true,
	"deleteCommand" : true,
	"error" : "An error occured on running command",
	"private" : true,
	"adminCommand" : false,
	"active" : false
});

commands.put({
	"_id" : "sms",
	"description" : "Inform a user that the sms langage is prohibiten on chan",
	"cooldown" : 10,
	"function" : false,
	"message" : "*Hey vous ne payez pas au mot, alors pas besoin d'écrire en abrégé ^^*",
	"private" : false,
	"deleteCommand" : true,
	"adminCommand" : false,
	"active" : false
});