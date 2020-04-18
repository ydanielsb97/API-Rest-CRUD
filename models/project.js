'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
	name: String,
	description: String,
	category: String,
	year: Number,
	langs: String,
	image: String,
	nameClient: String,
	dateStart: Number,
	limitTime: String,
	details: String

})

module.exports = mongoose.model('Project', ProjectSchema);