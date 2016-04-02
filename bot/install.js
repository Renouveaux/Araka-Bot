/*
First, initialise the bdd with available commands
*/

import mongoose from 'mongoose';
mongoose.connect('mongodb://192.168.0.254/araka');
var Schema = mongoose.Schema;

var commandSchema = new Schema({
	__v: {type: Number, select: false},
	name: {type: String},
	description : {type: String},
	cooldown : {type: Number, default: 10},
	fctn : {type: Boolean},
	private : {type: Boolean, default: false},
	deleteCommand : {type: Boolean, default: true},
	error : {type: String},
	adminCommand : {type: Boolean, default: false},
	active : {type: Boolean, default: false},
	message: {type: String}
});

var Commands = mongoose.model('commands', commandSchema);

var bit = new Commands({
    "name" : "bit",
	"description" : "Use bit to bitify a url, must be in canonical format",
	"fctn" : true,
	"error" : "You url must be in canonical format like http://www.domain.com"
}).save();


var clean = new Commands({
	"name" : "clean",
	"description" : "Delete a number of message or all chan",
	"fctn" : true,
	"error" : "You must specify a parameter",
	"adminCommand" : true
}).save();

var help = new Commands({
	"name" : "help",
	"description" : "Return all commands",
	"fctn" : true,
	"error" : "An error occured on running command",
	"private" : true
}).save();

var sms = new Commands({
	"name" : "sms",
	"description" : "Inform a user that the sms langage is prohibiten on chan",
	"fctn" : false,
	"message" : "*Hey vous ne payez pas au mot, alors pas besoin d'écrire en abrégé ^^*"
}).save();

