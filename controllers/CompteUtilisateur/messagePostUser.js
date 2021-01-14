//Methode POST
const MessUser = require("../../database/models/MessageUser"),
    path = require('path')

module.exports = (req, res) => {
    const {
        photo
    } = req.files

    const uploadFile = path.resolve(__dirname, "../../public/img-user-mess", photo.name);
    // console.log(req.files)
    photo.mv(uploadFile, (mvError) => {
        MessUser.create({
                ...req.body,
                photo: `/img-user-mess/${photo.name}`
            }

            , (error, messUser) => {
                if (!error) {
                    res.redirect("/pagePrincipale")
                } else {
                    const bddErrors = Object.keys(error.errors).map(key => error.errors[key].message);
                    req.flash("bddErrors", bddErrors)
                    res.redirect("/user/userMessage")
                }
            })

    })
}