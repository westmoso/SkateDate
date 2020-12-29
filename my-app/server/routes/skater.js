// const express = require("express");
// const checkAuth = require("../middleware/auth");
// const { Skater } = require("../models/skater");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const router = express.Router();
// const path = require("path");

// const uploadPath = path.join("uploads", "avatars");

// router.use(checkAuth);

// router.post("/register", async (req, res) => {
//     try {
//         let { email, password, passwordCheck, name } = req.body;

//         // validate

//         if (!email || !password || !passwordCheck)
//             return res.status(400).json({ msg: "Not all fields have been entered." });
//         if (password.length < 5)
//             return res
//                 .status(400)
//                 .json({ msg: "The password needs to be at least 5 characters long." });
//         if (password !== passwordCheck)
//             return res
//                 .status(400)
//                 .json({ msg: "Enter the same password twice for verification." });

//         const existingSkater = await Skater.findOne({ email: email });
//         if (existingSkater)
//             return res
//                 .status(400)
//                 .json({ msg: "An account with this email already exists." });

//         if (!name) name = email;

//         const salt = await bcrypt.genSalt();
//         const passwordHash = await bcrypt.hash(password, salt);

//         const newSkater = new Skater({
//             email,
//             password: passwordHash,
//             name,
//         });
//         const savedSkater = await newSkater.save();
//         res.json(savedSkater);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// router.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // validate
//         if (!email || !password)
//             return res.status(400).json({ msg: "Not all fields have been entered." });

//         const skater = await Skater.findOne({ email: email });
//         if (!skater)
//             return res
//                 .status(400)
//                 .json({ msg: "No account with this email has been registered." });

//         const isMatch = await bcrypt.compare(password, skater.password);
//         if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

//         const token = jwt.sign({ id: skater._id }, process.env.JWT_SECRET);
//         res.json({
//             token,
//             skater: {
//                 id: skater._id,
//                 displayName: skater.displayName,
//             },
//         });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// router.delete("/delete", auth, async (req, res) => {
//     try {
//         const deletedSkater = await Skater.findByIdAndDelete(req.skater);
//         res.json(deletedSkater);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// router.post("/tokenIsValid", async (req, res) => {
//     try {
//         const token = req.header("x-auth-token");
//         if (!token) return res.json(false);

//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         if (!verified) return res.json(false);

//         const skater = await Skater.findById(verified.id);
//         if (!skater) return res.json(false);

//         return res.json(true);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // router.get("/", auth, async (req, res) => {
// //     const skater = await Skater.findById(req.skater);
// //     res.json({
// //         name: skater.mame,
// //         id: skater._id,
// //     });
// // });

// router.get("/skater/dumbass", (req, res) => {
//     res.send("Hello, I hate coding!")
// });


// router.patch("/avatar", async (req, res) => {
//     try {
//         const file = req.files.file;

//         if (!file || file == null) return res.status(400).json({ error: "No avatar provided." });

//         file.mv(path.join(uploadPath, file.name));

//         const details = {
//             fileName: file.name,
//             filePath: path.join(uploadPath, file.name)
//         };

//         const skater = await Skater.findById(req.skater._id);

//         skater.avatar = details.filePath;

//         try {
//             await skater.save();
//             res.status(200).json(details);
//         } catch (err) {
//             fs.unlink(path.join(uploadPath, file.name), err => {
//                 if (err) console.error(err);
//             });
//             res.status(500).json({ error: "Saving failed." });
//         }
//     } catch (err) {
//         res.status(404).json({ error: "Could not find skater." });
//     }
// });

// router.delete("/", async (req, res) => {
//     try {
//         await Skater.findByIdAndDelete(req.skater._id);

//         res.status(200).json({ message: "Deleted" });
//     } catch (err) {
//         res.status(500).json({ error: "Could not delete" });
//     }
// });

// module.exports = router;