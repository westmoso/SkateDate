const mongoose = require('mongoose')

const messageSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    sentTo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Skater",
            required: true
        }
    ],
    sentFrom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skater",
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Message', messageSchema)