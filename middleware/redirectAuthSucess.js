const User = require("../database/models/User")


module.exports = (req, res, next) => {

    if (req.session.user) {
        console.log(res.locals.user);
        return res.redirect("/pagePrincipale")
    }

    next()
}