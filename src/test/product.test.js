import Product from "../DAO/mongo/product.mongo.js"
import Assert from "assert"
import mongoose from "mongoose"

mongoose.connect("mongodb+srv://Marting1996:CL0vqopVI2y3bmFo@coderbackend.gettbop.mongodb.net/?retryWrites=true&w=majority", {dbName: "Clase_21_test"})
    .then(() => "DB connected Clase21_Test")
    .catch((e) => "Error al conectar la db")

const assert = Assert.strict

describe("Testing Product Mongo", () => {
    

    it("El Mongo debe poder obtener los productos", async() => {
        const productsMongo = new Product()
        const result = await productsMongo.getAllProducts()

        assert.strictEqual(Array.isArray(result), true)
    })

     it("El Mongo debe poder crear productos", async() => {
        let mockProduct = {
            title: "Auriculares",
            description: "Son gamer",
            code: "13",
            price: "10",
            stock: "5",
            category: "Perifericos",
            thumbnail: "imagen",
            owner: "example@gmail.com"
        }
        
        const productMongo = new Product()
        const result = await productMongo.addProduct(mockProduct)
        
        assert.strictEqual(result.success, true)
    }) 

     it("El mongo debe crear un producto con el mail de su creador", async () => {
        let mockProduct = {
            title: "Auriculares",
            description: "Son gamer",
            code: "22",
            price: "10",
            stock: "5",
            category: "Perifericos",
            thumbnail: "imagen",
            owner: "example@gmail.com"
        }

        const productMongo = new Product()
        const result = await productMongo.addProduct(mockProduct)
        console.log("Resultado de agregar producto:", result.payload)
        assert.strictEqual(result.payload.owner, "example@gmail.com")

    }) 
    it("El mongo debe buscar un producto por su ID", async() => {
        const productMongo = new Product()

        const product = await productMongo.getProductById({_id: "654d1312cf20f04de77c33f4"})

        assert.strictEqual(typeof(product), "object")
        assert.strictEqual(product.title, "Auriculares")
    })

    it("El mongo debe poder eliminar el producto por su ID", async() => {
        const productMongo = new Product()
        //Aqui poner el id del producto a eliminar
        const deleteProduct = await productMongo.deleteProduct("654d1989ffe951c483275787")

        assert.strictEqual(deleteProduct.deletedCount, 1)
    })

})