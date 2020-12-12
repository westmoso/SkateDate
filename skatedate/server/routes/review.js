const checkAuth = require("../middleware/auth");
const { Review, validateReview } = require('../models/review');
const express = require('express');
const router = express.Router();

router.use(checkAuth);

router.post("/", async (req, res) => {
    const { review } = req.body;

    const { error: er } = validateReview(review);
    if (er) return res.status(400).json({ error: er });

    try {
        const newReview = new Review({
            review,
            reviewer: req.user._id
        });

        await newReview.save();

        return res.json({ post: newReview });
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server Error...");
    }
});

module.exports = router;