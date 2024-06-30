// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyC5xEiwX1N_VawcTWuQxH76xIrHZHwbsXo",
    authDomain: "ai-chatverse.firebaseapp.com",
    projectId: "ai-chatverse",
    storageBucket: "ai-chatverse.appspot.com",
    messagingSenderId: "611188285224",
    appId: "1:611188285224:web:893fb0fe14f50fedacba1d",
    measurementId: "G-3Y91K8G302"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
        messageDiv.style.opacity = 0;
    }, 5000);
}

const signUpForm = document.getElementById('signUpForm');
signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const firstName = document.getElementById('signup-firstname').value;
    const lastName = document.getElementById('signup-lastname').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                firstName: firstName,
                lastName: lastName
            };
            showMessage('Account Created Successfully', 'signUpMessage');
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
                .then(() => {
                    window.location.href = 'index.html';
                })
                .catch((error) => {
                    console.error("error writing document", error);

                });
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode == 'auth/email-already-in-use') {
                showMessage('Email Address Already Exists !!!', 'signUpMessage');
            }
            else {
                showMessage('unable to create User', 'signUpMessage');
            }
        })
});

const signInForm = document.getElementById('signInForm');
signInForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showMessage('login is successful', 'signInMessage');
            const user = userCredential.user;
            localStorage.setItem('loggedInUserId', user.uid);
            window.location.href = '../home';
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/invalid-credential') {
                showMessage('Incorrect Email or Password', 'signInMessage');
            }
            else {
                showMessage('Account does not Exist', 'signInMessage');
            }
        })
})