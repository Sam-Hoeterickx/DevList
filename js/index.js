import Note from "./Note.js";

let allNotes;
let titleInput;
let bodyInput;
let date;

function init(){
    console.log('DevList');
    getLists();
    addEvent();
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
    // const currentDate = `${currentDay} - ${currentMonth} - ${currentYear}`;
    return `${currentDay} - ${currentMonth} - ${currentYear}`
}

function addEvent(){
    const btn = document.querySelectorAll('#addNote-btn');
    const ctx = document.querySelector('.addNote');
    // let htmlString = ''
    btn.forEach(function(btn){
        btn.addEventListener('click', function(){
            let htmlString = `
                <input type="button" id="addNote-btn" value="+">
                <div class="addNote-pop-up">
                    <div class="inputItem">
                        <span>Title</span>
                        <input type="text" name="inputField" class="inputField" id="title">
                    </div>
                    <div class="inputItem">
                        <span>Body</span>
                        <input type="text" name="inputField" class="inputField" id="body">
                    </div>
                    <div class="add-btn">
                        <input type="button" id="add-DevList-btn" value="Add DevList">
                    </div>
                </div>
            `
            ctx.innerHTML = htmlString;
            readInputs();
        })
    })
}

function readInputs(){
    const btn = document.querySelector('#add-DevList-btn');

    btn.addEventListener('click', function(){
        titleInput = document.querySelector('#title').value;
        bodyInput = document.querySelector('#body').value;
        date = getDate();
        console.log(titleInput, bodyInput, date);
        postNote(titleInput, bodyInput, date);
    })
}

function postNote(title, body, date){
    fetch('https://chat-test.pockethost.io/api/collections/Notes/records', {
        method: "POST",
        headers: {
			"Content-Type": "application/json",
		},
        body: JSON.stringify({
            Title: title,
            Body: body,
            Date: date
        })
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        getLists();
    })
}

init();