const { connect } = require('mongoose');
const connectDB = require('./startup/db');
const express = require('express');
const app = express();
const skater = require('../routes/skater');


connectDB();

app.use(express.json());
app.use('/api/skater', skater);

const port = process.env.PORT||5000;
app.listen(port, () => {
    console.log(`Server started on port:${port}`)
});