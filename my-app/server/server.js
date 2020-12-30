const express = require('express');
const cors = require('cors')
require("dotenv").config();
const config = require('config');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

//APP
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

//DB
try {
    mongoose
        .connect(config.get("mongoURI"), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log("Connected to MongoDB."));
} catch (err) {
    console.log(`Could not connect to MongoDB.\nError: ${err}`);
    process.exit(24);
}

//ROUTES
const placeRoute = require('./routes/placeRoute');
const userRoute = require('./routes/userRoute');
const HttpError = require('./models/errorModel');

//Middleware



//API
app.use('/api/places', placeRoute);
app.use('/api/users', userRoute);


app.use(
    '/uploads/images',
    express.static(path.join('uploads', 'images'))
);

app.use((error, req, res, next) => {
    if (req.file) {
        fs.unlink(req.file.path, err => {
            console.log(err);
        });
    }

    if (res.headerSent) {
        return next(error);
    }

    res.status(error.code || 500).json({
        message: error.message || 'An unknown error occurred.'
    });
});

app.use((req, res, next) => {
    throw new HttpError('Could not find this route', 404);
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE'
    );
    next();
});

app.get("/", (req, res) => {
    res.send("ugh")
})

app.listen(port, () => {
    console.log(`Server started on port:${port}`)
});

app.all("*", (req, res) => {
    res.status(404).send(`Cannot find ${req.method} method for route ${req.path}`);
});
