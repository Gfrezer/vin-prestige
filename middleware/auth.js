const User = require("../database/models/User")


module.exports = (req, res, next) => {
    // connecte toi dans la BDD

    console.log("USER DANS AUTH : ", req.session.user)
    User.findById(req.session.user, (error, user) => {
        if (error || !user) {
            return res.redirect("/user/login")
        }
        next()
    })

    //verifie le user
    //si il est dans la BDD
    //sinon tu le redirige
}