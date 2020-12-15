const mongoose = require("mongoose");
// const Joi = require("joi");

const wishlistSchema = new mongoose.Schema({
    skater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skater"
    },
    location: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Location"
        }
    ]
});

wishlistSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            avatar: this.avatar || this.username.charAt(0)
        },
        config.get("jwtSecret")
    );
};

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

// function validateWishlist(Review) {
//     const schema = Joi.object({
//         location: Joi.string().min(2).max(50).required(),
//         skater: Joi.string().min(2).max(50).required(),
//     });
//     return schema.validate(Review);
// }

module.exports.validateWishlist = validateWishlist;
module.exports.Wishlist = Wishlist;

