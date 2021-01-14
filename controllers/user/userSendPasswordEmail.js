const User = require("../../database/models/User")
const nodeMailer = require("nodemailer")
const bcrypt = require("bcrypt")



module.exports = async (req, res) => {


    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (!user) {
            req.flash("message", "Si l'adresse email " + req.body.email + " nous est connue, vous allez recevoir un nouveau MDP par mail")
            res.redirect("/user/login")
        }
        console.log(user)


        const transporter = nodeMailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: "bidon8544@gmail.com",
                pass: "azerty?311!"
            }
        })

        function sortRand() {
            return (Math.round(Math.random(myrand)) - 0.5);
        }


        var chars = new Array("abcdefghijklmnopqrstuvwxyz".split(''),
            "abcdefghijklmnopqrstuvwxyz".toUpperCase().split(''),
            "0123456789".split(''), "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~".split(''));


        var rep = new Array();
        myrand = new Date().getMilliseconds();
        var level = 4;
        var long = 10;
        while (level > 1) {
            templong = Math.ceil(Math.random(myrand) * (long - (--level)));
            rep.push(templong);
            long = long - templong;
        }
        rep.push(long)
        var password = new Array();
        var i = -1;
        while (rep[++i]) {
            BaseL = chars[i].length
            j = -1;
            while ((j++ < rep[i] - 1) && (password.push(chars[i][Math.floor(Math.random(Math.pow(new Date().getMilliseconds(), 3)) * BaseL)]))) {}
        }

        const wpd = password.sort(sortRand).reverse().sort(sortRand).sort(sortRand).reverse().join('')
        var mailOptions = {
            from: "bidon8544@gmail.com",
            to: req.body.email,
            subject: 'Mot de passe oublié',
            text: `Votre nouveau mot de passe: ${wpd}`
        }


        user.password = wpd;
        user.save(function (err) {
            if (err) {
                req.flash("error", "Une erreur est survenue, veillez contacter l'administrateur du systeme")
                res.redirect("/user/mdpOublie") //TODO: gérer l'erreur
            }
            // sauvegardé!
            else {
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error)
                        req.flash("message", "Impossible d'envoyer un email à l'adresse : " + req.body.email + "Recommencez !")
                        res.redirect("/user/login")
                    } else {
                        req.flash("message", "Si l'adresse email " + req.body.email + " nous est connue, vous allez recevoir un nouveau MDP par mail")
                        res.redirect("/user/login")
                    }
                })
            }
        });


    })
}