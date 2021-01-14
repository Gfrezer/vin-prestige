const mongoose = require("mongoose")
const BouteilleSchema = new mongoose.Schema({

    nom: String,
    appellation: String,
    annee: String,
    classement: String,
    avis: String,
    region: String,
    image: String,
    prix: Number,
    createDate: {
        type: Date,
        default: new Date()
    }

})

const Bouteille = mongoose.model("Bouteille", BouteilleSchema)

module.exports = Bouteille