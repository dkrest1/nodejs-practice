const request = require("supertest")
const app = require("../src/app")
const Task = require("../src/models/task")
const User = require("../src/models/user")
const {
    userOne,
    userTwo,
    setupDatabase,
    taskOne
} = require("./fixtures/db")


beforeEach(setupDatabase)


// should a create task
test("should create a task for a user", async () => {
    const response = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${userOne.tokens[0].token} `)
        .send({
            description: "Finish the nodejs course"
        })
        .expect(201)

    const task = await Task.findById(response.body._id)

    expect(task).not.toBeNull()
    expect(task.completed).toBe(false)


})

//request all task from userone
test("request all task from userOne", async () => {
    const response = await request(app)
        .get("/tasks")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .expect(201)

    expect(response.body.length).toBe(2)
})

// test to have userTwo to delete UserOne tasks
test("request userTwo delete userOne Task", async () => {
    await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set("authorization", `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)

    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()

})