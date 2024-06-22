import Note from "./Note.js";
import getCookie from "./getCookie.js";
import getUserId from "./getUserId.js";


let allNotes;
let titleInput;
let bodyInput;
let date;
let username
let author

let notes=[];
let myNotes = [];

function init(){
    console.log('DevList');
    // console.log(document.cookie);   
    // console.log(getUserId()) 
    // const userId = getUserId();
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
//     console.log(author)
//     myNotes = allNotes.items.filter(function(note){
//         return note.ListOf = author
//     })
    myNotes = allNotes.items.filter(item => item.ListOf === author);
    console.log(myNotes)
}
function renderAllNotes(){
    const cookie = getCookie();
    author = getUserId();
    const ctx = document.querySelector('.notes-list');
    let htmlString = '';

    console.log('render');
    
    if(document.cookie == cookie){
        filterNotes(author);
        myNotes.forEach(function(note){
            let newNote = new Note(note.Title, note.Body, note.Date, note.id)
            htmlString += newNote.htmlString;
        })
    
        ctx.innerHTML = htmlString;
        addEvent();
        addOptionEvent();
    
    }
    else{
        alert('// Acces denied, you need to log in first')

    }
   
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
    let btnPop = "Pop"
    // let htmlString = ''
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

        postNote(titleInput, bodyInput, date, username);
    })
}

function postNote(title, body, date, username){
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
    const optionBtn = document.querySelectorAll('#options');
    const ctx = document.querySelector('.info');
    console.log('btn')
    optionBtn.forEach(function(element){
        element.addEventListener('click', function(){
            console.log('Option btn is active');

            let htmlString = `
                <span id="date">${this._date}</span>
                <input type="button" value=":" id="options">

                <p>PopUp</p>
            `
            // ctx.forEach(function(ctx){
                ctx.innerHTML = htmlString;
            // })
        })
    })
}

init();