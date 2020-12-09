const checkAuth = require("../middleware/auth");
const { Skater, validateSkater} = require('../models/skater');
const express = require('express');
const router = express.Router();

//Allendpointsandroutehandlersgohere

router.use(checkAuth);

router.post('/', async (req,res) => {
    try {
        const{error}=validateSkater(req.body);
        if(error)
        return res.status(400).send(error);

    
    // const Skater = new Skater({
    //     firstname: req.body.firstname,
    //     username: req.body.username,
    //     age: req.body.age,
    //     avatar: req.body.avatar,
    //     zipcode: req.body.zipcode,
    //     skateType: req.body.skatetype,
    //     dateStatus: req.body.datestatus,
    // });
    
    await Skater.save();
    
    return res.send(Skater);
    } catch(ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
    });

    // router.get('/', async (req,res) => {
    //     try { 
    //         const Skater = await Skater.find();
    //         return res.send(Skater);
    //     } catch (ex) {
    //         return res.status(500).send(`Internal Server Error: ${ex}`);
    //     } 
    // });

    router.delete("/", async (req, res) => {
        try {
            await Skater.findByIdAndDelete(req.user._id);
    
            res.status(200).json({ message: "Deleted" });
        } catch (err) {
            res.status(500).json({ error: "Could not delete" });
        }
    });


module.exports=router;