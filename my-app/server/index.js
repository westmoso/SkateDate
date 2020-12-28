const express = require('express');
const cors = require('cors')
require("dotenv").config();
const config = require('config');
const mongoose = require('mongoose');
const path = require('path');
const cloudinary = require('cloudinary');
const loginRoute = require('./routes/loginRoute');

require("dotenv").config();

//APP
const app = express();
const port = process.env.PORT || 5000;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});

app.use('/api', loginRoute);


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
const AuthRoute = require("./routes/auth");
const SkaterRoute = require('./routes/skater');
const ReviewRoute = require('./routes/review');
const CardsRoute = require("./routes/cards")

//Middleware
app.use(express.json());
app.use(cors());


//API
app.use("/api/auth", AuthRoute)
app.use("/api/skaters", SkaterRoute)
app.use("/api/review", ReviewRoute)
app.use("/api/cards", CardsRoute)

app.get("/", (req, res) => {
    res.send("i hate coding and love anthony")
})

app.listen(port, () => {
    console.log(`Server started on port:${port}`)
});

app.all("*", (req, res) => {
    res.status(404).send(`Cannot find ${req.method} method for route ${req.path}`);
});
