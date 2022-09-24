const request = require("supertest")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const app = require("../src/app")
const User = require("../src/models/user")


const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: "Akin",
    email: "akin@gmail.com",
    password: "akin12345",
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

// reg a new user
test("should sign up a new user", async () => {
    const response = await request(app).post("/users").send({
        name: "oluwatosin akande",
        email: "gee@gmail.com",
        password: "hello1212"
    }).expect(201)

    // to asser for the id in the database
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
    // assertion about the response
    expect(response.body).toMatchObject({
        user: {
            name: "oluwatosin akande",
            email: "gee@gmail.com"
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe("hello1212")

})


// to test so login
test("should login an existing user", async () => {
    const response = await request(app).post("/users/login").send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)

})


// To test for login failure
test("should not login non existent user", async () => {
    await request(app).post("/users/login").send({
        email: "ola@gmail.com",
        password: "ola12345"
    }).expect(400)
})

// test to get a profile for a user 
test("should  get a profile for an autjhorized user", async () => {
    await request(app)
        .get("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})


// test to get a response of 401 for an unauthenticated person
test("should not show profile for an unauthenticated person", async () => {
    await request(app)
        .get("/users/me")
        .send()
        .expect(401)
})

// test for an authorized user to be able to delete an account
test("should delete a user for an authorized person", async () => {
    const response = await request(app)
        .delete("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    // to comfirm if the user was deleted 
    const user = await User.findById(userOneId)
    expect(user).toBeNull()

})

// test for an unauthorized user to not be able to delete an account
test("should not be able to delete account if not authorized", async () => {
    await request(app)
        .delete("/users/me")
        .send()
        .expect(401)



})


// to upload file into the database
test("should upload an avatar image", async () => {
    await request(app)
        .post("/users/me/avatar")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .attach("avatar", "tests/fixtures/profile.jpg")
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))

})


// should update authorized user field
test("should update valid user field", async () => {
    await request(app)
        .patch("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: "mike"
        })
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toEqual("mike")
})


// // should not update unauthorized user field
test("should not update unauthorized user field", async () => {
    await request(app)
        .patch("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: "pretoria"
        })
        .expect(400)

})

