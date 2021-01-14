const User = require("../../database/models/User")
module.exports = async (req, res) => {
    const userExistant = await User.findOne({
        email: req.body.email
    })


    if (userExistant) {
        req.flash("registerError", ["Compte Existant"])

        return res.redirect('/user/create')
    }
    User.create(
        req.body, (error, user) => {

            if (error) {
                const registerError = Object.keys(error.errors).map(key => error.errors[key].message);



                req.flash("registerError", registerError)
                req.flash("data", req.body)



                return res.redirect("/user/create")
            }

            res.redirect("/user/login")
        }
    )


}