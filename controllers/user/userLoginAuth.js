const bcrypt = require("bcrypt")
const User = require("../../database/models/User")



module.exports = (req, res) => {

    const {
        email,
        password
    } = req.body;


    User.findOne({
        email
    }, (error, user) => {
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                console.log("error : " + error)
                if (same) {
                    console.log('OK');


                    req.session.user = user
                    res.redirect("/pagePrincipale")
                } else {
                    console.log('Pas OK');


                    res.redirect("/user/login")
                }
            })
        } else {

            console.log('NUL');

            return res.redirect("/user/create")
        }

    })

}