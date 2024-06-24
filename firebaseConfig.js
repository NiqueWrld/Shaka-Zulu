// firebaseConfig.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase, ref, set, onValue, onChildAdded, onChildChanged, onChildRemoved } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "shaka-zulu-581b6.firebaseapp.com", // Update with your Firebase project's auth domain
    databaseURL: "https://shaka-zulu-581b6-default-rtdb.firebaseio.com/",
    projectId: "shaka-zulu-581b6",
    storageBucket: "shaka-zulu-581b6.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

// Reference to a specific location in your database
const dbRefInput = ref(database, 'timestamp-input');
const dbRefOutnput = ref(database, 'timestamp-output');

// Listen for value changes
onValue(dbRefInput, (snapshot) => {
    const data = snapshot.val();
    console.log('Input Data updated:', data);
});

onValue(dbRefOutnput, (snapshot) => {
    const data = snapshot.val();
    console.log('Output Data updated:', data);

    if (data) {
        let now = new Date();

        let currentTime = now.toLocaleTimeString();

        if (data.time.substring(0, 5) == currentTime.substring(0, 5)) {
            console.log("Hallo");
        }
    }

});

// Function to set data

function setDataInput(data) {
    set(dbRefInput, data)
        .then(() => {
            console.log('Data successfully set:', data);
        })
        .catch((error) => {
            console.error('Error setting data:', error);
        });
}

export { setDataInput }; // Export the setData function if needed
