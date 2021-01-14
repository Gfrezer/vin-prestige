const assert = require("assert")
const findProduct = require("../searchProduct")


describe("Find product", () => {

    it("should display product name", () => {

        return findProduct("alsace").then(response => {
            assert.equal(response.message, "Produit trouvé.")
        })
    })

})