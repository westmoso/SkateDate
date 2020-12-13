const express = require('express');
const { getSpot, addSpot } = require('../controllers/stores');

const router = express.Router();

router
    .route('/')
    .get(getSpot)
    .post(addSpot);

module.exports = router;