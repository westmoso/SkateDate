// const Joi = require("joi");
// const bcrypt = require("bcrypt");
// const express = require("express");
// const { Skater, validateSkater } = require("../models/skater");

// const router = express.Router();

// router.post("/signin", async (req, res) => {
//     try {
//         const { error } = validateLogin(req.body);
//         if (error) return res.status(400).json({ error: error.details[0].message });

//         const skater = await Skater.findOne({ email: req.body.email });
//         if (!skater) return res.status(400).json({ error: "Invalid email or password." });

//         const validPassword = await bcrypt.compare(req.body.password, skater.password);

//         if (!validPassword) return res.status(400).json({ error: "Invalid email or password." });

//         const token = skater.generateAuthToken();

//         return res
//             .header("x-auth-token", token)
//             .header("access-control-expose-headers", "x-auth-token")
//             .json({ token });
//     } catch (ex) {
//         return res.status(500).json({ error: `Internal Server Error: ${ex}` });
//     }
// });

// router.post("/signup", async (req, res) => {
//     try {
//         const { error } = validateSkater(req.body);

//         if (error) return res.status(400).json({ error: error.details[0].message });

//         let skater = await Skater.findOne({ email: req.body.email });
//         if (skater) return res.status(400).json({ error: "Skater already registered." });

//         const salt = await bcrypt.genSalt(10);

//         skater = new Skater({
//             skatername: req.body.skatername,
//             email: req.body.email,
//             password: await bcrypt.hash(req.body.password, salt)
//         });

//         await skater.save();
//         const token = skater.generateAuthToken();

//         return res
//             .header("x-auth-token", token)
//             .header("access-control-expose-headers", "x-auth-token")
//             .json({ token });
//     } catch (ex) {
//         return res.status(500).json({ error: `Internal Server Error: ${ex}` });
//     }
// });

// function validateLogin(req) {
//     const schema = Joi.object({
//         email: Joi.string().min(5).max(255).required().email(),
//         password: Joi.string().min(5).max(1024).required()
//     });
//     return schema.validate(req);
// }

// module.exports = router;
