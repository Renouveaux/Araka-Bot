var mongoose = require('mongoose');

var schema = module.exports = new mongoose.Schema({
	__v : {type: Number, select: false},
	role : {type : String},
	pseudo : {type : String},
	userId : {type : String},
	avatar : {type : String},
	lastMessage : {type : Date},
	XP : {type : Number}
});