import { boolean, string } from "joi";

const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    firstName: string,
    age: string,
    skateStatus: boolean,
    imgUrl: string
})

export default mongoose.model('cards', cardSchema)