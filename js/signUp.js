function init(){
    console.log('//signUp');
    
    signUp();
}

function signUp(){
    const logINBtn = document.querySelector('#signUpBtn');

    logINBtn.addEventListener('click', function(){
        console.log('signUp btn is active');
        // readInputs();
        createAccount();
    })
}

function readInputs(){
    const userNameInput = document.querySelector('#signUp-userName').value;
    const emailInput = document.querySelector('#signUp-email').value;
    const passwordInput = document.querySelector('#signUp-password').value;
    const repeatPasswordInput = document.querySelector('#signUp-repeatpassword').value;

    return {
        username: userNameInput, 
        email: emailInput, 
        password: passwordInput,
        passwordConfirm: repeatPasswordInput
    }
}

function createAccount(){
    const data = readInputs();
    console.log(data);
    fetch('https://chat-test.pockethost.io/api/collections/users/records', {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        createNoteForUser(data.id);
    })
    .then(function(){
        // window.location.replace("http://127.0.0.1:5500/index.html");
        window.location.replace("https://sam-hoeterickx.github.io/DevList/");
    })
}

init();