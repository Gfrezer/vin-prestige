const mongoose = require("mongoose")
const Resa = new mongoose.Schema({


    userId: {
        type: String,
    },
    bouteilleId: {
        type: String,
    },
    createDate: {
        type: Date,
        default: new Date()
    }

})

const reservation = mongoose.model("Reservation", Resa)

module.exports = reservation