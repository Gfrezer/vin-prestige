const products = require('./db/products')

const findProduct = (name) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const product = products.find(product => product.name == name)

            if (!product) {
                return reject(new Error(`Le produit est introuvable.`))
            }

            return resolve({
                message: `Produit trouvé.`,
                product
            })
        }, 1000)
    })
}

module.exports = findProduct