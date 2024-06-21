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
            getDate();
        })
}

function renderAllNotes(){
    const ctx = document.querySelector('.notes-list');
    let htmlString = '';

    allNotes.items.forEach(function(note){
        let newNote = new Note(note.Title, note.Body, note.Date, note.id)
        htmlString += newNote.htmlString;
    })

    ctx.innerHTML = htmlString;
}

function getDate(){
    const toDay = new Date();
    const currentDay = toDay.getDate();
    const currentMonth = toDay.getMonth() + 1;
    const currentYear = toDay.getFullYear();

    const currentDate = `${currentDay} - ${currentMonth} - ${currentYear}`

    console.log(currentDate);
}

init();