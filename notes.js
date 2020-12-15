const { notDeepEqual } = require('assert');
const fs = require('fs');

const getNotes = function() {
    return "Your notes..."
}

const addNote = function(title, body) {
    const notes = loadNotes();
    const duplicateNotes = notes.filter( function (note) {
        return note.title === title;
    });
    
    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes);
        console.log('new note added!');
    } else {
        console.log('Note title taken!');
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

//first time when there is no file, this indeed throw an error and return an empty array from catch block
const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
         return [];   
    }
    
}

module.exports = {
    getNotes : getNotes,
    addNote: addNote
}
