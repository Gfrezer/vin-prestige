 const bouteille = require("../../database/models/Bouteille")

 module.exports = async (req, res) => {
     bouteille.findByIdAndRemove(
         req.params.id, {
             useFindAndModify: false
         },
         function (err) {
             if (!err) {
                 console.log('Suppression réussie');
             } else {
                 res.redirect('/bouteilles/add');
             }
         });
     res.redirect('/bouteilles/add');
 }