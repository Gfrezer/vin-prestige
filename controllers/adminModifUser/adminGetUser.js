//Methode GET

const userMod = require("../../database/models/User")
module.exports = async (req, res) => {

    const allUsers = await userMod.find({})
    res.render('adminModifUser', {
        allUsers
    })
}