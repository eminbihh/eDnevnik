// import our functions from ourFunctions.js
export function registerUser(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(cred => {
            console.log("User successfully created!");
            // clear inputs
            document.getElementById('login').value = '';
            document.getElementById('password').value = '';
        }).catch(err => {
            console.log(err.message);
        })
}

// log into app
export function loginUser(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log('Successfully authenticated!');
            // direct to logic success page
            window.location.href = '../html/loggedIn.html';
        }).catch(err => {
            console.log(err.message);
        })
}

// simple error check to see if inputs are empty
export function checkIfInputEmpty(userInput, passInput) {
    if (userInput.length === 0 || passInput.length === 0) {
        return true
    } else {
        return false
    }
}

// ===== Firebase configuration (start) ==== //
var firebaseConfig = {
    apiKey: "AIzaSyCQLfRVW36H29ZTkyTgdsMI4OGNJ5-Bvzk",
    authDomain: "ednevnik-f30e4.firebaseapp.com",
    projectId: "ednevnik-f30e4",
    storageBucket: "ednevnik-f30e4.appspot.com",
    messagingSenderId: "982908815609",
    appId: "1:982908815609:web:d61c3aaea3878b5b5b7a28",
    measurementId: "G-Z9ERRB2MR5"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
// ===== Firebase configuration (end) ==== //

// button variables
let loginBtn = document.getElementById('loginBtn');
let registerBtn = document.getElementById('registerBtn');
let submitBtn = document.getElementById('submitBtn');
// input field variables
let userInput = document.getElementById('login');
let passInput = document.getElementById('password');


// login tab
loginBtn.addEventListener('click', function(e) {
    userInput.value = "";
    passInput.value = "";
    this.className = 'active';
    registerBtn.className = 'inactive underlineHover';
    submitBtn.value = 'Login';
});

//register tab
registerBtn.addEventListener('click', function(e) {
    userInput.value = "";
    passInput.value = "";
    this.className = 'active';
    loginBtn.className = 'inactive underlineHover';
    submitBtn.value = 'Register';
});

// submit button
submitBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if (submitBtn.value === 'Register') {
        // check if any inputs are empty
        if (ourFunctions.checkIfInputEmpty(userInput.value, passInput.value)) {
            console.log('Please fill in all fields.');
        } else {
                ourFunctions.registerUser(userInput.value, passInput.value);
            }
    } else if (submitBtn.value === 'Login') {
        ourFunctions.loginUser(userInput.value, passInput.value);
    }
})
