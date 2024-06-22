import getCookieToken from "./getCookie.js";
let allUsers;

let username;
let author;
let password;

function init(){
    console.log('//logIn');
    deleteAllCookies();
    console.log(document.cookie)
    getUsers();
    
}

function getUsers(){
    fetch('https://chat-test.pockethost.io/api/collections/users/records')
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        allUsers = data;
        console.log(allUsers);  
        logIn();
    })
}

function logIn(){
    const logINBtn = document.querySelector('#logInBtn');

    logINBtn.addEventListener('click', function(){
        console.log('login btn is active');
        const userNameInput = document.querySelector('#logIn-userName').value;
        const passwordInput = document.querySelector('#logIn-password').value;

        allUsers.items.forEach(function(user){
            username = user.username;
            password = user.password;
            author = user.username;

            if(username == userNameInput || password == passwordInput){
                // alert('match');
                getToken(userNameInput, passwordInput);
                setCookie(user.username, 1, 'Author')
                console.log(document.cookie);
            }
        })
    })
}

function getToken(username, password){
    fetch('https://chat-test.pockethost.io/api/collections/users/auth-with-password',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            identity: username,
            password: password,
            passwordConfirm: password
        })
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log('getToken',data);
        setCookie(data.token, 1, 'token');
        // const token = getCookie();
        // console.log(token)
        console.log(document.cookie);
    })   
    .then(function(){
        window.location.replace("http://127.0.0.1:5500/list.html");
    })
}



function setCookie(cvalue, exdays, name) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + cvalue + ";" + expires + ";path=/";
}

function deleteAllCookies() {
    document.cookie.split(';').forEach(cookie => {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
}

init();