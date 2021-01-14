//Methode GET

const messUser = require("../../database/models/MessageUser")
module.exports = async (req, res) => {

    const errors = req.flash("bddErrors")
    const messageUtilisateur = await messUser.find({})
    res.render('userMessage', {
        messageUtilisateur,
        errors
    })
}