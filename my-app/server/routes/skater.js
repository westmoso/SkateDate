const express = require("express");
const checkAuth = require("../middleware/auth");
const { Skater } = require("../models/skater");
const router = express.Router();
const path = require("path");

const uploadPath = path.join("uploads", "avatars");

router.use(checkAuth);

router.patch("/avatar", async (req, res) => {
    try {
        const file = req.files.file;

        if (!file || file == null) return res.status(400).json({ error: "No avatar provided." });

        file.mv(path.join(uploadPath, file.name));

        const details = {
            fileName: file.name,
            filePath: path.join(uploadPath, file.name)
        };

        const skater = await Skater.findById(req.skater._id);

        skater.avatar = details.filePath;

        try {
            await skater.save();
            res.status(200).json(details);
        } catch (err) {
            fs.unlink(path.join(uploadPath, file.name), err => {
                if (err) console.error(err);
            });
            res.status(500).json({ error: "Saving failed." });
        }
    } catch (err) {
        res.status(404).json({ error: "Could not find skater." });
    }
});

router.delete("/", async (req, res) => {
    try {
        await Skater.findByIdAndDelete(req.skater._id);

        res.status(200).json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ error: "Could not delete" });
    }
});

module.exports = router;