const User = require("../database/models/User")


module.exports = (req, res, next) => {
    // connecte toi dans la BDD


    User.findById(req.session.user, (error, user) => {
        if (error || !user || !user.isAdmin) {
            return res.redirect("/user/login")
        }
        next()
    })

    //verifie le user
    //si il est dans la BDD
    //sinon tu le redirige
}