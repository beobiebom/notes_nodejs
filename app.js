// const fs = require('fs')
// // Tạo ra file notes.txt và ghi 
// // fs.writeFileSync('notes.txt', 'This file was created by Node.js!')

// //Ghi thêm vào file 
// fs.appendFileSync('notes.txt', '\n My name is Duc')

// //Gọi file này thì nó sẽ thực hiện các hàm trong file nhưng không thể gọi các biến trong file utils vào file app trừ khi nó được module.export
// const name = require('./utils.js')

// console.log(name)

// const addFunc = require('./utils')
// const sum = addFunc(2, 2)
// console.log(sum)

// const validator = require('validator')
// console.log(validator.isEmail('beo@gmail.com'))
// console.log(validator.isEmail('https/emas'))

// const chalk = require('chalk')
// console.log(chalk.red("Dit con me may!"))

// const command = process.argv[2]

// if(command === 'add'){
//     console.log('Adding notes')
// }else if(command === 'remove'){
//     console.log('Removing notes')
// }

const yargs = require('yargs')
const {addNote, removeNote, listNotes, readNote} = require('./notes.js')

yargs.command({
    command: "add",
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        console.log('Title:',argv.title)
        console.log('Body:',argv.body)
        addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        console.log('Removing the note!')
        removeNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler: function(){
        console.log('Listing out all note')
        listNotes()
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        console.log('Reading a note')
        readNote(argv.title)
    }
})

yargs.parse()