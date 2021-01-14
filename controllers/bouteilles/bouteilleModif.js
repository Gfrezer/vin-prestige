const bouteille = require("../../database/models/Bouteille")

module.exports = async (req, res) => {

    if (req.session.user && req.session.user.isAdmin) {

        const maBouteille = await bouteille.findById(req.params.id)

        req.flash("maBouteille", maBouteille)
        req.flash("idChoisi", req.params.id)

        res.redirect("/bouteilles/add/" + req.params.pageNum)
    } else {



        res.redirect("/user/login")
    }
}