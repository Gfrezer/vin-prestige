const path = require('path')
const Bouteille = require("../../database/models/Bouteille")
module.exports = (req, res) => {
    if (req.params.id) {
        Bouteille.findByIdAndUpdate(req.params.id, req.body, (error, bouteille) => {
            res.redirect("/bouteilles/add/" + req.params.pageNum)
        })
    } else {
        const {
            image
        } = req.files


        const uploadFile = path.resolve(__dirname, "../../public/bouteilles", image.name)

        image.mv(uploadFile, (error) => {
            Bouteille.create({
                ...req.body,
                image: `/bouteilles/${image.name}`
            }, (error, bouteille) => {
                res.redirect("/bouteilles/add/" + req.params.pageNum)
            })
        })
    }

}