const chalk = require('chalk')
const getNotes = require('./notes')


const notes = getNotes();
console.log(notes)

console.log(chalk.green('Success' , chalk.red("i Am very bold") + chalk.inverse(' Red inverse')))