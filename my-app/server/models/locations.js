const mongoose = require("mongoose");
// const Joi = require("joi");

const locationSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true,
        locationInfo: {
            name: "",
            address: "",
            hours: "" //what do I want the review info to contain? is it userfilled or is it rcvng data from elsewhere on the frontend
        }
    }
});

const Location = mongoose.model("Location", locationSchema);

// function validateLocation(Review) {
//     const schema = Joi.object({
//         location: Joi.string().min(2).max(50).required(),
//         skater: Joi.string().min(2).max(50).required(),
//     });
//     return schema.validate(Review);
// }

module.exports.validateLocation = validateLocation;
module.exports.Location = Location;

