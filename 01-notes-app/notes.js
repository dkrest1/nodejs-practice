const fs = require("fs")
const chalk = require("chalk")

const addNotes = (title, body) => {
    const notes = loadNotes()

    const duplicateNotes = notes.find(note => {
        return note.title == title
    })

    if (!duplicateNotes) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("New notes added successfully"))
    } else {
        console.log(chalk.red.inverse("Notes title has already been taken!"))
    }

}

const removeNotes = (title) => {
    const notes = loadNotes()
    const filteredNotes = notes.filter(note => {
        return note.title != title
    })

    if (filteredNotes.length === notes.length) {
        console.log(chalk.white.bgRed("note notes like that"))
    } else {
        saveNotes(filteredNotes)
        console.log(chalk.white.bgGreen("notes removed successfully"))
    }

}

const listNotes = () => {
    notes = loadNotes()
    notes.forEach(note => console.log(chalk.white.inverse(note.title)))

}

const readNotes = (title) => {
    const notes = loadNotes()
    requiredNote = notes.find(note => note.title === title)

    if (requiredNote) {
        console.log(chalk.green.inverse(requiredNote.title))
        console.log(requiredNote.body)
    } else {
        console.log(chalk.red.inverse("No notes was found"))
    }




}



const getNotes = () => {
    const notes = loadNotes()
    return "getNotes..."
}

const loadNotes = () => {
    try {
        const bufferNotes = fs.readFileSync("notes.json")
        const stringNotes = bufferNotes.toString()
        return JSON.parse(stringNotes)
    } catch (e) {
        return []
    }

}


const saveNotes = (notes) => {
    const JSONnotes = JSON.stringify(notes)
    fs.writeFileSync("notes.json", JSONnotes)
}

module.exports = {
    addNotes: addNotes,
    getNotes: getNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
}