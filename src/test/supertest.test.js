import chai from "chai"
import supertest from "supertest"
import { faker } from "@faker-js/faker/locale/es_MX";

const expect = chai.expect
const requester = supertest("http://localhost:8080")

describe("SuperTest", () => {
    let cookie
    const mockUser = {
        first_name: "Martin",
        last_name: "Gomez",
        email: faker.internet.email(),
        age: "20",
        password: "1234",
        role: "premium",

    }
    describe("Testing sessions", () => {

        it("Debe poder registrar un usuario", async () => {
            const result = await requester.post("/api/current/register").send(mockUser)
            expect(result.status).to.equal(201)

        })
        it("Debe poder loguear un user y devolver una cookie", async () => {
            const result = await requester.post("/api/current/login").send({
                email: mockUser.email,
                password: mockUser.password
            })
            const cookieResult = result.headers["set-cookie"][0]
            cookie = {
                name: cookieResult.split("=")[0],
                value: cookieResult.split("=")[1].split(";")[0]
            }
            expect(cookie.name).to.be.ok.and.eql("secretForJWT")
            expect(cookie.value).to.be.ok
        })
        it("Debe poder hacer logout", async () => {
            const result = await requester.post("/api/current/logout")

            expect(result.status).to.equal(302);
            expect(result.headers.location).to.equal("/api/current/login");
        })

    })

    describe("Testing products", () => {
        it("En el endoponit POST /api/products/new debería poder agregar un producto", async () => {
            const mockProduct = {
                title: "Auriculares",
                description: "Son gamer",
                code: "222",
                price: "10",
                stock: "5",
                category: "Perifericos",
                thumbnail: "imagen",
                owner: "example@gmail.com"
            }
            let response
            try {
                response = await requester
                    .post("/api/products/new")
                    .set("Authorization", `Bearer ${mockUser}`)
                    .send(mockProduct)
            } catch (error) {
                console.error("Error en el test", error);
            }
            const { status, ok, _body } = response
            console.log({ status });
            console.log({ ok });
            console.log({ _body });


        })


        it("En el enpoint GET /api/products debería obtener todos los productos", async () => {
            const result = await requester.get("/api/products")
            expect(result.status).to.equal(201);
            expect(result.body).to.be.an("object")
        })
    })
})