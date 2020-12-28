const express = require('express');
const loginRoute = express.Router();
const loginOp = require('../ops/loginOp');
const userOperations = require('../db/userOperations');
const sessionChecker = require('../utils/middleware/sessionChecker');

loginRoute.post('/login', (request, response) => {

    console.log('request.body inside of login API is', request.body);
    loginOp.fetchUser(request.body.userObject, request, response);
});

loginRoute.post('/register', (request, response) => {
    console.log('inside the register route...');
    loginOp.registerUser(request.body.userObject, request, response);
});

loginRoute.get('/getUsers', sessionChecker, (request, response) => {
    console.log('inside getusers route...');
    userOperations.getUsers(request, response);
});

loginRoute.post('/like', (request, response) => {
    console.log('inside /like route');
    console.log('request.body obtained', request.body);
    userOperations.likeUser(request, response);
});

module.exports = loginRoute;