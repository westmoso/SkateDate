const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
    spotId: {
        type: String,
        required: [true, "Please add a Spot ID"],
        unique: true,
        trim: true,
        maxlength: [40, "Store ID must be less than 50 characters"]
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Geocode & create location
SpotSchema.pre('save', async function (next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress
    };

    // Do not save address
    this.address = undefined;
    next();
});

module.exports = mongoose.model('Spot', SpotSchema);