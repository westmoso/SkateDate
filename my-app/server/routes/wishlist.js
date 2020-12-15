const checkAuth = require("../middleware/auth");
const { Wishlist, validateWishlist } = require('../models/wishlist');
const express = require('express');
const router = express.Router();

router.use(checkAuth);

router.post("/", async (req, res) => {
    const { wishlist } = req.body;

    const { error: er } = validateWishlist(wishlist);
    if (er) return res.status(400).json({ error: er });

    try {
        const newWishlist = new Wishlist({
            location,
            skater: req.user._id
        });

        await newWishlist.save();

        return res.json({ post: newWishlist });
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server Error...");
    }
});

module.exports = router;