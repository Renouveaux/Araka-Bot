var mongoose = require('mongoose');

var schema = module.exports = new mongoose.Schema({
	__v: {type: Number, select: false},
	userID : {type: String},
	lastMessage : {type: Date, default : Date.now()},
	XP : {type: Number, default : 0}
});