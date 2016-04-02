import mongoose from 'mongoose';

var schema = module.exports = new mongoose.Schema({
	__v: {type: Number, select: false},
	any: {}
});