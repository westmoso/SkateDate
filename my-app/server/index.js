const express = require('express');
const cors = require('cors')
const config = require('config');
const mongoose = require('mongoose');


const app = express();

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



app.use(express.json());

app.use(cors());

app.use("/api/skater", SkaterRoute)
app.use("/api/review", ReviewRoute)

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port:${port}`)
});

app.all("*", (req, res) => {
    res.status(404).send(`Cannot find ${req.method} method for route ${req.path}`);
});
