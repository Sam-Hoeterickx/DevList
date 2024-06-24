import Note from "./Note.js";
import getCookie from "./getCookie.js";
import getUserId from "./getUserId.js";


let allNotes;
let titleInput;
let bodyInput;
let date;
let username;
let author

let notes=[];
let noteIds;
let myNotes = [];

function init(){
    console.log('//DevList');
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
            sortData();
            renderAllNotes();
            getDate();
        })
}

function sortData(){
    notes = allNotes.items.sort(function(a,b){
        if(a.updated < b.updated){
            return 1
        }else if(a.updated > b.updated){
            return -1
        }
    })
    console.log(notes);
}

function filterNotes(){
    myNotes = allNotes.items.filter(item => item.ListOf === author);
    console.log(myNotes)
}
function renderAllNotes(){
    const cookie = getCookie();
    author = getUserId();
    noteIds = [];
    const ctx = document.querySelector('.notes-list');
    let htmlString = '';
    
    if(document.cookie == cookie){
        filterNotes(author);
        myNotes.forEach(function(note){
            let newNote = new Note(note.Title, note.Body, note.Date, note.id)
            noteIds.push(note.id);
            htmlString += newNote.htmlString;
        })
    
        console.log(noteIds)
        ctx.innerHTML = htmlString;
        addEvent();
        addOptionEvent();
    }
    else{
        alert('// Acces denied, you need to log in first')
    }
    logInRedirect();
}

function getDate(){
    const toDay = new Date();
    const currentDay = toDay.getDate();
    const currentMonth = toDay.getMonth() + 1;
    const currentYear = toDay.getFullYear();
    return `${currentDay} - ${currentMonth} - ${currentYear}`
}

function addEvent(){
    const btn = document.querySelectorAll('#addNote-btn');
    const ctx = document.querySelector('.addNote');

    btn.forEach(function(btn){
        btn.addEventListener('click', function(){
            let htmlString = `
                
                <div class="addNote-pop-up">
                    <h3>Add new Note</h3>
                    <div class="inputItem">
                        <span>Title</span>
                        <input type="text" name="inputField" class="inputField" id="title">
                    </div>
                    <div class="inputItem">
                        <span>Body</span>
                        <textarea name="inputField" class="inputField" id="body"></textarea>
                    </div>
                    <span id="more-info">// For a new line type < br ></span>
                    <div class="add-btn">
                        <input type="button" id="add-DevList-btn" class="btn" value="Add DevList">
                        <a href="list.html" id="signUp-btn">close</a>
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
    const ctx = document.querySelector('.addNote');

    btn.addEventListener('click', function(){
        
        titleInput = document.querySelector('#title').value;
        bodyInput = document.querySelector('#body').value;
        date = getDate();

        let htmlString  = `
            <div class="addNote">
                <input type="button" id="addNote-btn" value="+">
            </div>
        `

        ctx.innerHTML = htmlString;
        postNote(titleInput, bodyInput, date, author);
    })
}

function postNote(title, body, date, author){
    fetch('https://chat-test.pockethost.io/api/collections/Notes/records', {
        method: "POST",
        headers: {
			"Content-Type": "application/json",
		},
        body: JSON.stringify({
            Title: title,
            Body: body,
            Date: date,
            ListOf: author
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

function addOptionEvent(){
    const updateBtn = document.querySelectorAll('#updateBtn');
    const deleteBtn = document.querySelectorAll('#deleteBtn');

    updateBtn.forEach(function(element,id){
        element.addEventListener('click', function(){
            const noteID = noteIds[id];
            addUpdateEvent(noteID);
        })
    })

    deleteBtn.forEach(function(element,id){
        element.addEventListener('click', function(){
            const noteID = noteIds[id];
            deleteNote(noteID);
        })
    })
}

function addUpdateEvent(noteID){
    const ctx = document.querySelector('.addNote');

    let htmlString = `
        <div class="addNote-pop-up">
            <h3>Update Note</h3>
            <div class="inputItem">
                <span>Title</span>
                <input type="text" name="inputField" class="inputField" id="title">
            </div>
            <div class="inputItem">
                <span>Body</span>
                <textarea name="inputField" class="inputField" id="body"></textarea>
            </div>
            <span id="more-info">// For a new line type < br ></span>
            <div class="add-btn">
                <input type="button" id="update-DevList-btn"  class="btn" value="Update DevList Note">
                <a href="list.html" id="signUp-btn">close</a>
            </div>
        </div>
    `

    ctx.innerHTML = htmlString;
    readUpdateInputs(noteID);
}

function readUpdateInputs(noteID){
    const btn = document.querySelector('#update-DevList-btn');
    const ctx = document.querySelector('.addNote');

    btn.addEventListener('click', function(){
        titleInput = document.querySelector('#title').value;
        bodyInput = document.querySelector('#body').value;
        date = getDate();

        let htmlString  = `
            <div class="addNote">
                <input type="button" id="addNote-btn" class="btn" value="+">
            </div>
        `

        ctx.innerHTML = htmlString;
        updateNote(noteID, titleInput, bodyInput, date, author);
    })
}

function updateNote(noteID, title, body, date, author){
    console.log('update', noteID)
    fetch(`https://chat-test.pockethost.io/api/collections/Notes/records/${noteID}`,{
        method:"PATCH",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Title: title,
            Body: body,
            Date: date,
            ListOf: author
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

function deleteNote(noteID){
    fetch(`https://chat-test.pockethost.io/api/collections/Notes/records/${noteID}`,{
        method:"DELETE"
    })
    .then(function(){
        getLists();
    })
}

function logInRedirect(){
    if(author === undefined){
        // window.location.replace("http://127.0.0.1:5500/index.html");
        window.location.replace("https://sam-hoeterickx.github.io/DevList/index.html");
    }
}

init();