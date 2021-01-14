const bouteille = require("../../database/models/Bouteille")

module.exports = async (req, res) => {

    var pageNum = req.params.pageNum || 1

    if (req.session.user.isAdmin) {
        const bouteilles = await bouteille.find({}, null, {
            limit: 8,
            skip: (pageNum - 1) * 8
        });
        const maBouteille = req.flash("maBouteille")[0]
        const idChoisi = req.flash("idChoisi")

        return res.render("bouteille/add", {
            maBouteille: maBouteille,
            idChoisi: idChoisi,
            bouteilles: bouteilles,
            pageNum: pageNum
        })
    }

    res.redirect("/user/login")
}