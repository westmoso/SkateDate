const Skater = require('../models/skater');
const express = require('express');
const router = express.Router();

//Allendpointsandroutehandlersgohere

router.post('/', async (req,res) => {
    try {
        const{error}=validate(req.body);
        if(error)
        return res.status(400).send(error);

    
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

    router.get('/', async (req,res) => {
        try { 
            const Skater = await Skater.find();
            return res.send(Skater);
        } catch (ex) {
            return res.status(500).send(`Internal Server Error: ${ex}`);
        } 
    });


module.exports=router;