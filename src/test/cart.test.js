import Cart from "../DAO/mongo/cart.mongo.js"
import chai from "chai"
import mongoose from "mongoose"
import cartModel from "../DAO/mongo/models/cart.mongo.model.js"

mongoose.connect("mongodb+srv://Marting1996:CL0vqopVI2y3bmFo@coderbackend.gettbop.mongodb.net/?retryWrites=true&w=majority", {dbName: "Clase_21_test"})
    .then(() => "DB connected Clase21_Test")
    .catch((e) => "Error al conectar la db")

const expect = chai.expect

describe("Testing Cart Mongo", () => {
    it("El mongo debe obtener todos los carritos", async() => {
        const cartMongo = new Cart()
        const result = await cartMongo.getAllCarts()

        expect(result).to.be.an("array")
    })

    it("El test debe obtener un carrito por ID", async() =>{
        const cartMongo = new Cart()
        //Agregar id del carrito de la bdd
        const result = await cartMongo.getCartById({_id: "654e96c57ae4cabdb2e451e6"})

        expect(result).to.be.an("object")
    })

     it("El test debe poder crear un Carrito", async() => {
        const cartMongo = new Cart()
        const result = await cartMongo.createCart()

        expect(result).to.have.property("_id")
    }) 

    it("El test debe poder borrar un carrito por su ID", async() => {
        const cartMongo = new Cart()
        //Agregar id del carrito de la bdd
        const result = cartMongo.deleteCart("654e9a5e88f785d9540b117c")

        const deletedCart = await cartModel.findById("654e9a5e88f785d9540b117c")
        expect(deletedCart).to.be.null;
    })

})