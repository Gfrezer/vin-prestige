// Methode DELETE
const userModel = require("../../database/models/User")

module.exports = (req, res) => {

    userModel.deleteOne({
            _id: req.params.id
        },
        function (error) {
            if (!error) {
                res.redirect("/adminModifUser")
            } else {
                res.send(error)
            }
        }

    )
}