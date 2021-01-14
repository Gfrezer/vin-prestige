const mongoose = require("mongoose")
const MessageSchema = new mongoose.Schema({

    content: {
        type: String,
        required: [true, "Message Obligatoire"],
        maxlength: [50, "Message trop long, limité à 50 caractéres !"]

    },
    photo: {
        type: String,
        required: [true, "Photo Obligatoire"],
    },

    author: String,

    createDate: {
        type: Date,
        default: new Date()
    }


})

const message = mongoose.model("message", MessageSchema)
module.exports = message