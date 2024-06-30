const toggleButton = document.querySelector('.dark-light');
const colors = document.querySelectorAll('.color');


// Wait for the voices to be loaded
window.speechSynthesis.onvoiceschanged = function() {
  var voices = speechSynthesis.getVoices();
};


colors.forEach(color => {
  color.addEventListener('click', e => {
    colors.forEach(c => c.classList.remove('selected'));
    const theme = color.getAttribute('data-color');
    document.body.setAttribute('data-theme', theme);
    color.classList.add('selected');
  });
});

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

const ipAddress = "192.168.0.100";
const port = "3001";

async function sendText() {
  const ai = document.querySelector('.chat-area-title').innerHTML;
  const text = document.getElementById('textInput').value;

  document.getElementById('textInput').value = null;
  document.querySelector('.chat-area-main').innerHTML += `
    <div class="chat-msg owner">
      <div class="chat-msg-profile">
        <img class="chat-msg-img" src="../images/user.jpg" alt="" />
        <div class="chat-msg-date">Message seen 1.22pm</div>
      </div>
      <div class="chat-msg-content">
        <div class="chat-msg-text">${text}</div>
      </div>
    </div>`;

  try {
    const response = await fetch(`http://${ipAddress}:${port}/send_text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ai, text })
    });

    function add(result) {
      document.querySelector('.chat-area-main').innerHTML += `
      <div class="chat-msg">
        <div class="chat-msg-profile">
          <img class="chat-msg-img" src="../images/Shaka.jpg" alt="" />
          <div class="chat-msg-date">Message seen 1.22pm</div>
        </div>
        <div class="chat-msg-content">
          <div class="chat-msg-text">${result.message}</div>
        </div>
      </div>`;

      speak(result.message)
    }

    function speak(output) {
      if ('speechSynthesis' in window) {
        
      } else {
        alert('Sorry your browser <strong>does not support</strong> speech synthesis.<br>Try this in <a href="https://www.google.co.uk/intl/en/chrome/browser/canary.html">Chrome Canary</a>.');
      }

      var msg = new SpeechSynthesisUtterance();

      msg.text = output;

      msg.volume = 1;
      msg.rate = 1;
      msg.pitch = 1;

      var Zulu = "Microsoft Themba Online (Natural) - Zulu (South Africa)";
      var voices = speechSynthesis.getVoices();
      var selectedVoice = voices[320];
      msg.voice = selectedVoice;

      window.speechSynthesis.speak(msg);
    }


    add(await response.json());

    var element = document.querySelector('.chat-area');
    element.scrollTop = element.scrollHeight;

  } catch (error) {
    console.error('Error sending text:', error);
  }
}

const form = document.querySelector('.chat-area-footer');

form.addEventListener('submit', event => {
  event.preventDefault();
  sendText();
});

// Check browser support for Web Speech API
if ('speechRecognition' in window || 'webkitSpeechRecognition' in window) {
  // Create a new instance of SpeechRecognition
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  // Set language to Zulu (isiZulu)
  recognition.lang = 'zu-ZA';

  // Define event handler for when speech is recognized
  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    document.getElementById('textInput').value = transcript;
    sendText()
  };

  // Define event handler for errors
  recognition.onerror = function (event) {
    console.error('Speech recognition error:', event.error);
  };

  // Start recognition when button is clicked
  document.getElementById('start-recognition').addEventListener('click', function () {
    recognition.start();
  });
} else {
  alert('Speech recognition not supported in your browser. Please use a supported browser (e.g., Chrome, Firefox).');
}