const mongoose = require("mongoose");
const Joi = require('joi');

const skaterSchema = new mongoose.Schema({
    firstName:{
        type: String
    },
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
    age: {
        type: Number
    },
    zipCode: {
        type: Number,
        minlength: 5,
        maxlength: 5,
    },
    skateType:{
        type: String
    },
    dateStatus:{
        type: Boolean
    }
});

function validateSkater (product){ 
    const schema = Joi.object({
    
    firstname: Joi.string().min(2).max(50).required(),
    username: Joi.string().min(2).max(50).required(),
    age: Joi.number().required(),
    avatar: Joi.string().min(2).max(50).required(),
    zipcode: Joi.string().min(5).max(5).required(),
    skateType: Joi.string().min(2).max(50).required(),
    dateStatus: Joi.boolean(),
    });
    return schema.validate(Skater);
    }
    

    exports.Skater = Skater;
    exports.validate = validateSkater;
    exports.SkaterSchema = SkaterSchema;   

const Skater = mongoose.model("Skater", skaterSchema);
module.exports.Skater = Skater;
