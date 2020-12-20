const mongoose = require("mongoose");

const SkaterCardSchema = new mongoose.Schema({
    age: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skater"
    },
    url: {
        type: String //for the avatar/profile image
    },
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skater"
    }
})
const Cards = mongoose.model('cards', SkaterCardSchema);


export default Cards