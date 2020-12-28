const express = require('express');
const router = express.Router();
const loginOp = require('../actions/loginOp');
const skaterOp = require('../actions/skaterOp');
const sessionChecker = require('../middleware/sessionChecker');

router.post('/login', (request, response) => {
    console.log('request.body inside of login API is', request.body);
    loginOp.fetchSkater(request.body.skaterObject, request, response);
});

router.post('/register', (request, response) => {
    console.log('inside the register route...');
    loginOp.registerSkater(request.body.skaterObject, request, response);
});

router.get('/getSkaters', sessionChecker, (request, response) => {
    console.log('inside get Skaters route...');
    skaterOp.getSkaters(request, response);
});

router.post('/like', (request, response) => {
    console.log('inside /like route');
    console.log('request.body obtained', request.body);
    skaterOp.likeSkater(request, response);
});

module.exports = router;