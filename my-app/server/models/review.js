const mongoose = require('mongoose')
const Joi = require('joi');
const config = require("config");
const jwt = require("jsonwebtoken");

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true,
        siteInfo: {
            location: "",
            safetyGear: "",
            distancing: "",
            masks: "",
            children: ""
        }
    },
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skater",
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

reviewSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            avatar: this.avatar || this.username.charAt(0)
        },
        config.get("jwtSecret")
    );
};

const Review = mongoose.model("Review", reviewSchema);

function validateReview(Review) {
    const schema = Joi.object({
        review: Joi.string().min(2).max(50).required(),
        reviewer: Joi.string().min(2).max(50).required(),
    });
    return schema.validate(Review);
}

module.exports.validateReview = validateReview;
module.exports.Review = Review;  