const fs = require('fs');
const chalk = require('chalk');


const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find( note => note.title === title );
    
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.green.inverse('new note added!'));
    } 
    else {
        console.log(chalk.red.inverse('Note title taken!'));
    }
}

const removeNote = (title)=> {
    const notes = loadNotes();
    const notesToKeep = notes.filter( note => note.title !== title );

    if(notesToKeep.length < notes.length) {
        saveNotes(notesToKeep);
        console.log(chalk.green.inverse("Note removed!"));
    } 
    else {
        console.log(chalk.red.inverse("No note found!"))
    }
}

const listNotes = ()=>{
    const notes = loadNotes();
    console.log(chalk.bold.inverse('Your Notes'));
    notes.forEach( note => {
        console.log(note.title);
    });
}

const readNote = (title) =>{
    const notes = loadNotes();
    const note = notes.find( note => note.title === title);
    if(note){
        console.log( chalk.inverse(note.title));
        console.log( note.body);
    }
    else {
        console.log( chalk.red.inverse( "Note not found!"));
    }
}

const saveNotes =  (notes)=> {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

//first time when there is no file, this indeed throw an error and return an empty array from catch block
const loadNotes = () =>{
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
         return [];   
    }
    
}


module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
}
