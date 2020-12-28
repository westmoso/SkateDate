const mongoose = require("mongoose");
const Joi = require('joi');
const config = require("config");
const jwt = require("jsonwebtoken");
const path = require("path");

const skaterSchema = new mongoose.Schema({
    name: {
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
        allowNull: false,
        isEmail: true,
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
    birthday: {
        type: String,
        get: a => {
            let date = new Date(a);
            let today = new Date();
            let timeDiff = today.getTime() - date.getTime();
            let age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
            return age;
        },
        set: age => age,
        alias: 'age',
    },
    age: {
        type: Number
    },
    zipCode: {
        type: Number,
        minlength: 5,
        maxlength: 5,
        required: true,
        defaultValue: '',
    },
    preferences: {
        type: String,
        defaultValue: []
    },
    looking: {
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
    ],
    isDeleted: {
        type: String
    }
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
        username: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    });
    return schema.validate(Skater);
}


module.exports.validateSkater = validateSkater;
module.exports.Skater = Skater;   
