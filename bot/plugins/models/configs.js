var mongoose = require('mongoose');

var schema = module.exports = new mongoose.Schema({
	__v: {type: Number, select: false},
	name : { type : String},
	description : {type : String},
	message : {type : String},
	value : mongoose.Schema.Types.Mixed
});