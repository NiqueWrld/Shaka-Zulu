import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import{getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

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

  const auth=getAuth();
  const db=getFirestore();

  onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                document.querySelector('.user-name').innerText=userData.firstName + " " + userData.lastName;
                document.querySelector('.user-email').innerText=userData.email;
            }
            else{
                console.log("no document found matching id")
            }
        })
        .catch((error)=>{
            console.log("Error getting document");
        })
    }
    else{
        console.log("User Id not Found in Local storage")
        window.location.href = "../account";
    }
  })

  const logoutButton=document.querySelector('.logout-button');

  logoutButton.addEventListener('click',()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
        window.location.href='../';
    })
    .catch((error)=>{
        console.error('Error Signing out:', error);
    })
  })