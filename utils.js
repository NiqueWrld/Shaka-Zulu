export async function convertAudioBufferToWavBlob(audioBuffer) {
  return new Promise(function (resolve) {
    var worker = new Worker('./wave-worker.js');

    worker.onmessage = function (e) {
      var blob = new Blob([e.data.buffer], { type: 'audio/wav' });
      resolve(blob);
    };

    let pcmArrays = [];
    for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
      pcmArrays.push(audioBuffer.getChannelData(i));
    }

    worker.postMessage({
      pcmArrays,
      config: { sampleRate: audioBuffer.sampleRate },
    });
  });
}

import { setDataInput } from '/firebaseConfig.js';

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDa28qQZ2bAdGN8lq9AtA8BQB3q9gwN8z0",
  authDomain: "shaka-zulu-581b6.firebaseapp.com",
  projectId: "shaka-zulu-581b6",
  storageBucket: "shaka-zulu-581b6.appspot.com",
  messagingSenderId: "316811432200",
  appId: "1:316811432200:web:47f115f6b6e163ba8f9cbd",
  measurementId: "G-5S8TBQCMSD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export function downloadBlob(blob, filename) {
  // Create a reference to the storage bucket
  const storageRef = ref(storage, `${filename}`);

  // Upload the blob to Firebase Storage
  return uploadBytes(storageRef, blob)
    .then((snapshot) => {
      console.log('File uploaded successfully:', snapshot);

      setTimeout(() => {

        let now = new Date();
        
        let currentDate = now.toLocaleDateString(); // Format: MM/DD/YYYY
        let currentTime = now.toLocaleTimeString(); // Format: HH:MM:SS AM/PM
        let currentHour = now.getHours();

        setDataInput({
          date: currentDate,
          time: currentTime,
          hour: currentHour
        });
      }, 1000);

    })
    .catch((error) => {
      console.error('Error uploading file:', error);
      throw error;
    });
}

export function initButtonListener(mediaRecorder) {
  const recordButton = document.getElementById('record-button');
  recordButton.innerHTML = 'Record';

  recordButton.addEventListener('click', () => {
    if (mediaRecorder.state === 'inactive') {
      mediaRecorder.start();
      recordButton.innerHTML = 'Recording ...';
    } else {
      mediaRecorder.stop();
      recordButton.innerHTML = 'Record';
    }
  });
}
