//Methode GET


module.exports = async (req, res) => {
    const newMdp = req.flash("nouveauMDP")
    const errors = req.flash("errorAncienPassword")

    res.render('userCompte', {
        errors,
        newMdp
    })
}