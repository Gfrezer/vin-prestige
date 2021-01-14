const Bcrypt = require("bcrypt")
const UserModel = require("../../database/models/User")

module.exports = async (req, res) => {
    UserModel.findById(req.session.user._id, (error, user) => {
        const ancienPwd = req.body.ancienPassword
        console.log(ancienPwd);
        if (user) {
            user.adresse = req.body.adresse
            user.pseudo = req.body.pseudo
            user.name = req.body.name
            user.email = req.body.email
            if (!ancienPwd) {
                user.save(function (err) {
                    if (err) {
                        //TODO: gérer l'erreur
                    }
                    // sauvegardé!
                    else {
                        req.session.user = user
                        res.redirect("/user/userCompte")
                    }

                });
            } else {
                Bcrypt.compare(ancienPwd, user.password, (error, same) => {
                    console.log(ancienPwd, user.password)
                    if (same) {
                        console.log('OK');

                        user.password = req.body.password

                        user.save(function (err) {
                            console.log('SAVE');
                            req.flash("nouveauMDP", ["Nouveau Mot de passe validé !"])
                            if (err) {
                                console.log('ERR');
                                //TODO: gérer l'erreur
                                console.log(err)
                            }
                            // sauvegardé!
                            else {
                                req.session.user = user
                                res.redirect("/user/userCompte")
                            }
                        });


                    } else {
                        //TODO: flash messages pour les erreurs
                        req.flash("errorAncienPassword", ["Votre mot de passe est faux !"])
                        res.redirect("/user/userCompte")

                    }
                })
            }
        } else {
            console.log('Erreur interne, utilisateur en session non correspondant');
            return res.redirect("/pagePrincipale")
        }

    })

}