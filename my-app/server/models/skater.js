const mongoose = require("mongoose");
const Joi = require('joi');
const config = require("config");
const jwt = require("jsonwebtoken");


const skaterSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255
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
        required: true,
    },
    preferences: {
        type: String
    },
    skatetus: {
        type: Boolean
    },
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Wishlist"
        }
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

skaterSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            avatar: this.avatar || this.username.charAt(0)
        },
        config.get("jwtSecret")
    );
};

const Skater = mongoose.model("Skater", skaterSchema);

function validateSkater(Skater) {
    const schema = Joi.object({
        firstname: Joi.string().min(2).max(50).required(),
        username: Joi.string().min(2).max(50).required(),
        age: Joi.number().required(),
        avatar: Joi.string().min(2).max(50).required(),
        zipcode: Joi.string().min(5).max(5).required(),
        skateType: Joi.string().min(2).max(50).required(),
        skateStatus: Joi.boolean(),
    });
    return schema.validate(Skater);
}


module.exports.validateSkater = validateSkater;
module.exports.Skater = Skater;   
