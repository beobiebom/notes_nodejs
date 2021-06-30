const fs = require('fs')
const chalk = require('chalk')

const addNote = function(title, body){
    const notes = loadNotes()

    const duplicateNote = notes.find((value) => {
        return (value.title===title) && (value.body===body)
    })
   
    if(!duplicateNote){
        notes.push({
            title,
            body
        })
        saveNotes(notes)
        console.log('New note added!')
    }else{
        console.log('Note title taken!')
    }

}

const removeNote = function(title){
    const notes = loadNotes()
    const notesToKeep = notes.filter((value, index) => {
        return value.title !== title
    })
    
    if(notes.length > notesToKeep.length){
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    }else{
        console.log(chalk.red.inverse('No note found!'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    
    notes.forEach(element => {
        console.log(element.title)
    });
}

const readNote = (title) => {
    const notes = loadNotes()
    const findNote = notes.find((obj) => obj.title === title)

    if(findNote){
        console.log(chalk.blue.bold.inverse(findNote.title))
        console.log(findNote.body)
    }else{
        console.log(chalk.red.inverse('Note not found!'))
    }
}

const saveNotes = function(notes){
    const dataJSON = JSON.stringify(notes)

    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function(){
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }
}

module.exports = {addNote, removeNote, listNotes, readNote}