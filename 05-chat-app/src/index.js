const path = require("path")
const http = require("http")
const express = require("express")
const dotenv = require("dotenv").config()
const socketio = require("socket.io")
const Filter = require("bad-words")
const { generateMessage, generateLocation } = require("../src/utils/messages")

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT
const publicDirectoryPath = path.join(__dirname, "../public")

app.use(express.static(publicDirectoryPath))

io.on("connection", (socket) => {
    console.log("New WebSocket connection")




    socket.on("join", ({ username, room }) => {
        socket.join(room)

        socket.emit("message", generateMessage("Welcome!"))
        socket.broadcast.to(room).emit("message", generateMessage(`${username} has joined!`))

        // socket.emit, io.emit, socket.broadcast.emit
        // io.to.emit, socket.broadcast.to.emit
    })

    socket.on("sendMessage", (message, callback) => {
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback("profane is not allowed")
        }

        io.emit("message", generateMessage(message))
        callback()
    })

    socket.on("sendLocation", (location, callback) => {
        io.emit("locationMessage", generateLocation(`https://google.com/maps?q=${location.latitude},${location.longitude}`))
        callback()
    })

    socket.on("disconnect", () => {
        io.emit("message", generateMessage("A user left"))
    })
})

server.listen(port, () => {
    console.log(`server is up on ${port}!`)
})