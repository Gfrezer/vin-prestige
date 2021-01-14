const Resa = require("../../database/models/Reservation");
module.exports = async (req, res) => {
    let datas = {
        userId: req.session.user._id,
        bouteilleId: req.params.bouteilleId
    }

    const resaExistante = await Resa.findOne(datas)
    if (resaExistante) {

        console.log("Resa Existante")
        resaExistante.delete()
        res.redirect("/pagePrincipale")

    } else {

        Resa.create(
            datas, (error, resa) => {
                console.log("log de datas")
                console.log(datas)
                if (error) {
                    const registerError = Object.keys(error.errors).map(key => error.errors[key].message);

                    req.flash("registerError", registerError)

                    return res.redirect("/")
                }
                res.redirect("/pagePrincipale")
            }
        )
    }

}