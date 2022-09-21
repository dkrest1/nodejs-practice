const fs = require("fs")
// const { json } = require("stream/consumers")
// const book = {
//     title: "Love Letter",
//     body: "mary love letter"
// }

// const JSONbook = JSON.stringify(book)
// const dataBuffer = fs.readFileSync("1-json.json")
// const JSONdata = dataBuffer.toString()
// const data = JSON.parse(JSONdata)
// console.log(data.title)
// console.log(data.body)

const dataBuffer = fs.readFileSync("1-json.json")
const dataJSON = dataBuffer.toString()
const data = JSON.parse(dataJSON)


data.name = "Oluwatosin"
data.age = 26

fs.writeFileSync("1-json.json", JSON.stringify(data))




