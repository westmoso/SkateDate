const express = require("express");
const checkAuth = require("../middleware/auth");
const { Skater } = require("../models/skater");
const router = express.Router();
const path = require("path");

import Cards from "./models/SkaterCard"

const routes = (app) => {
    app.route('/cards')
        .get((req, res) =>
            res.send('GET request successful!'))
        .post((req, res) => res.set('POST request successful!'));



    app.get("/", (req, res) => res.status(200).send("i fucking hate coding"))

    app.post("/cards", (req, res) => {
        const skCard = req.body;

        Cards.create(skCard, (err, data) => {
            if (err) {
                res.status(500).send(err)
            }
            else {
                res.status(201).send(data)
            }
        })
    });

    app.get("/cards", (req, res) => {
        const skCard = req.body;

        Cards.find(skCard, (err, data) => {
            if (err) {
                res.status(500).send(err)
            }
            else {
                res.status(201).send(data)
            }
        })
    });
}