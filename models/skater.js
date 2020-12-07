const mongoose = require("mongoose");

const skaterSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50
	},
	password: {
		type: String,
		required: true,
		maxlength: 1024,
		minlength: 5
	},
	avatar: {
		type: String
	},
});

const Skater = mongoose.model("Skater", skaterSchema);
module.exports.Skater = Skater;
