module.exports = (req, res) => {
    const errors = req.flash("registerError");
    res.render("register", {
        errors: errors,
        data: req.flash("data")[0]

    })
}