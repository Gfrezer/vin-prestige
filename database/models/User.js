const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({





    adresse: {
        type: String
    },
    pseudo: {
        type: String
    },

    name: {
        type: String,
        required: [true, "Nom Obligatoire"]
    },
    email: {
        type: String,
        required: [true, "Email Obligatoire"],
        unique: true

    },
    password: {
        type: String,
        required: [true, "Mot de passe Obligatoire"]
    },
    message: {
        type: String,
    },

    scalesplus18: {
        type: Boolean,
        required: [true, "Vous n'avez pas 18 ans ?"]

    },
    isAdmin: {
        type: Boolean,
        default: false,
    }

});

UserSchema.pre("save", function (next) {
    const user = this
    bcrypt.hash(user.password, 10, (error, encrypted) => {
        user.password = encrypted

        next()
    })
})

module.exports = mongoose.model("User", UserSchema)