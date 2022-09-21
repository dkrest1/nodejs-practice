// const fs = require("fs");
// const validator = require("validator")
// const nodemon = require("nodemon")
const chalk = require("chalk")
const { string } = require("yargs")
const yargs = require("yargs")
const { addNotes, getNotes, removeNotes, listNotes, readNotes } = require("./notes")


yargs.version('1.1.0')

// add, remove update list and read
yargs.command({
    command: "add",
    describe: "add a note",
    builder: {
        title: {
            describe: "Note Title",
            demandOption: true,
            type: 'string'

        },

        body: {
            describe: "Note Body",
            demandOption: true,
            type: "string"
        }
    },
    handler: function (argv) {
        // console.log("Title: " + argv.title)
        // console.log("Body: " + argv.body)

        addNotes(argv.title, argv.body)
    }
})


// remove a note
yargs.command({
    command: "remove",
    describe: "remove a note",
    builder: {
        title: {
            describe: "delete a note",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => {
        removeNotes(argv.title)
    }
})

// read a note
yargs.command({
    command: "read",
    describe: "read a note",
    builder: {
        title: {
            describe: "read a note",
            demandOption: true,
            type: "string"
        }

    },
    handler: (argv) => {
        readNotes(argv.title)
    }
})

// list a note
yargs.command({
    command: "list",
    describe: "listing a note",
    handler: () => {
        listNotes()
    }
})

yargs.parse()