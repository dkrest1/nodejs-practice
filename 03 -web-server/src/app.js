const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forcast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000

const publicFileDirectory = path.join(__dirname, "../public")
const viewDirectory = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials/")


app.set("view engine", "hbs")
app.set("views", viewDirectory)
hbs.registerPartials(partialPath)


app.use(express.static(publicFileDirectory))

// hello


app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Oluwatosin Temitope"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Page",
        name: "Oluwatosin Temitope"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Page",
        name: "Oluwatosin Akande"
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "Error Page",
        name: "Oluwatosin Akande",
        error: "Help Article not found!"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "please provide an address"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forcast(latitude, longitude, (error, forcast) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forcast,
                location,
                address: req.query.address
            })
        })
    })
})

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "you must provide the search string"
        })
    }

    console.log(req.query.search)

    res.send({
        products: []
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "Error Page",
        name: "Oluwatosin Akande",
        error: "Page not found!"
    })
})

app.listen(port, () => {
    console.log(`server is up on port ${port}`)
})


