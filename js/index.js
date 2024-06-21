import Note from "./Note.js";

let allNotes;
let newNote;

function init(){
    console.log('DevList');
    getLists();
}

function getLists(){
    fetch('https://chat-test.pockethost.io/api/collections/Notes/records')
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            allNotes = data
            console.log(allNotes);
            renderAllNotes();
        })
}

function renderAllNotes(){
    const ctx = document.querySelector('.notes-list');
    let htmlString = '';

    allNotes.items.forEach(function(note){
        let newNote = new Note(note.Title, note.Body, note.id)
        htmlString += newNote.htmlString;
    })

    ctx.innerHTML = htmlString;
}

init();