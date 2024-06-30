const aiData = [
    {
        "name": "Sipho AI",
        "description": "An AI developed by NiqueWrld As a Chat Companion",
        "image": "../images/ihawu.png"
    },
    {
        "name": "Shaka Zulu AI",
        "description": "An AI language model developed by OpenAI capable of generating human-like text.",
        "image": "../images/Shaka.jpg"
    }
];

function createMessageElement(ai) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('msg');

    const img = document.createElement('img');
    img.classList.add('msg-profile');
    img.src = ai.image;
    img.alt = '';

    const msgDetailDiv = document.createElement('div');
    msgDetailDiv.classList.add('msg-detail');

    const msgUsernameDiv = document.createElement('div');
    msgUsernameDiv.classList.add('msg-username');
    msgUsernameDiv.innerHTML = `${ai.name}`;

    const msgContentDiv = document.createElement('div');
    msgContentDiv.classList.add('msg-content');

    const msgMessageSpan = document.createElement('span');
    msgMessageSpan.classList.add('msg-message');
    msgMessageSpan.textContent = ai.description;

    const msgDateSpan = document.createElement('span');
    msgDateSpan.classList.add('msg-date');
    msgDateSpan.textContent = '20m';

    msgContentDiv.appendChild(msgMessageSpan);
    msgContentDiv.appendChild(msgDateSpan);

    msgDetailDiv.appendChild(msgUsernameDiv);
    msgDetailDiv.appendChild(msgContentDiv);

    msgDiv.appendChild(img);
    msgDiv.appendChild(msgDetailDiv);

    return msgDiv;
}

function addAI(ai) {

    const img = document.createElement('img');
    img.classList.add('chat-area-profile');
    img.src = ai.image;
    img.alt = '';

    return img;
}

document.addEventListener('DOMContentLoaded', () => {
    const conversationArea = document.querySelector('.conversation-area');
    const chatAreaGroup = document.querySelector('.chat-area-group');
    counter = 0;
    isGreaterThen3 = false;

    aiData.forEach(ai => {
        const messageElement = createMessageElement(ai);
        messageElement.addEventListener('click', () => {
            if (document.querySelector('.active')) {
                document.querySelector('.active').classList.remove('active')
            }
            messageElement.classList.add('active')
            document.querySelector('.chat-area-title').innerHTML = ai.name
        });
        conversationArea.appendChild(messageElement);

        if (counter < 3) (
            chatAreaGroup.appendChild(addAI(ai))
        )
        else {
            isGreaterThen3 = true;
        }

        counter++;
    });

    if(isGreaterThen3){
        const span = document.createElement('span');
        span.innerHTML = counter - 3 + "+";
        chatAreaGroup.appendChild(span)
    }
});