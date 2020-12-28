const express = require('express');
const cors = require('cors')
require("dotenv").config();
const config = require('config');
const mongoose = require('mongoose');
const path = require('path');
const multipart = require('connect-multiparty');
const cloudinary = require('cloudinary');
const http = require('http').Server(app);
const io = require('socket.io')(http);

//APP
const app = express();
const port = process.env.PORT || 5000;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});


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
const LoginRoute = require("./routes/login")

//Middleware
app.use(express.json());
app.use(cors());

app.use(function (req, res, next) {
    console.log('inside the cors middleware');
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.header("Access-Control-Allow-Headers", "Origin, authorization, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.setHeader("Cache-Control", "no-cache");
    next();
});



//API
app.use("/api/auth", AuthRoute)
app.use("/api/skaters", SkaterRoute)
app.use("/api/review", ReviewRoute)
app.use("/api/cards", CardsRoute)

app.get("/", (req, res) => {
    res.send("ugh")
})

app.listen(port, () => {
    console.log(`Server started on port:${port}`)
});

app.all("*", (req, res) => {
    res.status(404).send(`Cannot find ${req.method} method for route ${req.path}`);
});


const multipartMiddleware = multipart();
app.post('/upload', multipartMiddleware, (req, res) => {
    // Upload
    cloudinary.v2.uploader.upload(req.files.image.path, {}, function (
        error,
        result
    ) {
        if (error) {
            console.log('error saving image..', error);
            return res.status(500).send(error);
        }
        // Save to db
        console.log('image saved to cloudinary', result);
        res.json({
            message: result,
            status: 200
        })
    });
});

app.use('/api', LoginRoute);
//socket connections
let connected = module.exports.connected = [];
var found = false;
io.on('connection', (socket) => {
    console.log('skater connected...');
    socket.emit('connection');
    socket.on('login', (payload) => {
        console.log('data received on login ...', payload);
        //connected skater
        connected.push(payload);
        console.log('connected in login event on server', connected);
    });
    socket.on('like', (skaterObject) => {
        console.log('inside like socket event at the server and skaterObject is', skaterObject);
        skaterOperations.likeSkater(skaterObject, () => {
            //notif on like
            let socketid;
            console.log('connected array is', connected);
            for (let i = 0; i < connected.length; i++) {
                console.log('connected email ' + connected[i].email + ' and skaterObject email ' + skaterObject.targetEmail);
                if (connected[i].email == skaterObject.targetEmail) {
                    console.log('inside if.. and socketid is', connected[i].socketid);
                    socket = connected[i].socketid;
                    console.log('running cb and socketid is', socketid);
                    io.to(connected[i].socketid).emit('sendLike', {
                        message: 'you were liked by ' + skaterObject.email
                    });
                }
            }

        });
    })
});