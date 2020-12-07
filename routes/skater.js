const Skater = require('../models/skater');
const express = require('express');
const router = express.Router();

//Allendpointsandroutehandlersgohere

router.post('/', async (req,res) => {
    try {
    
    const Skater = newSkater({
        firstname: req.body.firstname,
        username: req.body.username,
        age: req.body.age,
        avatar: req.body.avatar,
        zipcode: req.body.zipcode,
        skateType: req.body.skatetype,
        dateStatus: req.body.datestatus,
    });
    
    await Skater.save();
    
    return res.send(Skater);
    } catch(ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
    });

module.exports=router;