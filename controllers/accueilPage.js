//Bouteille
const Bouteille = require("../database/models/Bouteille")
const Message = require('../database/models/MessageUser')
const Reservation = require('../database/models/Reservation')

module.exports = async (req, res) => {




    var pageNum = req.params.pageNum || 1
    const resas = await Reservation.find({
        userId: req.session.user._id
    })

    let bouteilles = await Bouteille.find({})

        .sort({
            createDate: -1
        }).limit(8)
        .skip((pageNum - 1) * 8);


    bouteilles.forEach(b =>
        b.reserve = (resas.findIndex(r => r.bouteilleId == b._id) > -1)
    )

    /*for (i = 0; i < bouteilles.length; i++) {
        const idBouteille = bouteilles[i]._id;
        bouteilles[i].reserve = false;
        for (j = 0; j < resas.length; j++) {
            const idResas = resas[j].bouteilleId;
            if (idBouteille === idResas) {
                bouteilles[i].reserve = true;
            }
        }
    }*/

    // affiche messages
    const messages = await Message.find({})
        .sort({
            createDate: -1
        }).limit(6)

    res.render("pagePrincipale", {
        bouteilles: bouteilles,
        messages: messages,
        pageNum: pageNum
    })
}