var mongoose = require('mongoose');

var schema = module.exports = new mongoose.Schema({
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