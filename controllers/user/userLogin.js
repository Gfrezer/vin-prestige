module.exports = (req, res) => {
    const message = req.flash("message")
    res.render("login", {
        message: message
    })

}