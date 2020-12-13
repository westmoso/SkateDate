const Spot = require('../models/Spot');

// @desc  Get all spot
// @route GET /api/v1/spot
// @access Public
exports.getSpot = async (req, res, next) => {
    try {
        const spot = await Spot.find();

        return res.status(200).json({
            success: true,
            count: spot.length,
            data: spot
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// @desc  Create a spot
// @route POST /api/v1/spot
// @access Public
exports.addSpot = async (req, res, next) => {
    try {
        const spot = await Spot.create(req.body);

        return res.status(201).json({
            success: true,
            data: spot
        });
    } catch (err) {
        console.error(err);
        if (err.code === 11000) {
            return res.status(400).json({ error: 'This spot already exists' });
        }
        res.status(500).json({ error: 'Server error' });
    }
};