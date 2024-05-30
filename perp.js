document.getElementById('refreshButton').addEventListener('click', function() {
    location.reload();
  });
  
 document.querySelectorAll('.question-button').forEach(button => {
    button.addEventListener('click', function() {
      const question = this.querySelector('div').textContent;
      displayAnswer(question);
    });
  });

  document.getElementById('uploadButton').addEventListener('click', function() {
    document.getElementById('fileInput').click();
  });

  document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      displayAnswer(`File uploaded: ${file.name}`);
    }
  });

  document.getElementById('askButton').addEventListener('click', function() {
    const questionInput = document.getElementById('questionInput');
    const question = questionInput.value;
    displayAnswer(question);
    questionInput.value = '';
  });



//This part was written by Frederick
const API_KEY = 'sk-proj-t0Uu83FTGrdB42sXgHk4T3BlbkFJtsijqDutQOkuXUjB6AFN'
const chatInput = document.querySelector('#questionInput')
const submitButton = document.querySelector('#askButton')
const chatMessages = document.querySelector('#chatMessages');

let userText = null;

const createElement = (html, className) => {
  const chatDiv = document.createElement("p");
  chatDiv.classList.add('chat', className);
  chatDiv.innerHTML = html;
  return chatDiv;
}

const getChatResponse = () => {
  const API_URL = 'https://api.openai.com/v1/chat/completions';

  const requestOptions = {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer ${API_KEY}',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        model: "text-davinci-003",
        prompt: userText,
        //messages: [{role: "user", content: "Hello!"}],
        max_tokens: 2048,
        temperature: 0.2,
        n: 1,
        stop: null
        })  
}

const showTypingAnimation = () => {
  const html = `<div>
                  <div style="--delay: 0.2s"></div>
                  <div style="--delay: 0.3s"></div>
                  <div style="--delay: 0.4s"></div>
                </div>`;
  const outgoingChat = createElement(html,'incoming');
  chatMessages.appendChild(outgoingChat);
  getChatResponse();
}

const handleOutgoingChat = () => {
  userText = chatInput.value.trim(); //get chat input and remove whitespaces
  if (userText) {
  const html = `<p>${userText}</p>`;
  const outgoingChat = createElement(html,'outgoing');
  chatMessages.appendChild(outgoingChat); // Append the chat message to the chat container
  chatInput.value = ''; // Clear the input field after sending the message
  setTimeout(() => { // Scroll after a short delay to ensure new chat appears separately
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 100);
  setTimeout(showTypingAnimation, 500);
        }
    }

// async function getMessage() {
//     console.log('clicked')
//     // const options = {
//     //     method: 'POST',
//     //     headers: {
//     //         'Authorization': 'Bearer ${API_KEY}',
//     //         'Content-Type': 'application/json'
//     //     },
//     //     body: JSON.stringify({
//     //         model: "gpt-3.5-turbo-16k",
//     //         messages: [{role: "user", content: "Hello!"}],
//     //         max_tokens: 100
//     //         })  
//     // }
//     // try {
//     //     const response = await fetch('https://api.openai.com/v1/chat/completions', options)
//     //     const data = await response.json()
//     //     console.log(data)
//     // }
//     // catch (error){
//     //     console.error(error)
//     // }
// }

submitButton.addEventListener('click', handleOutgoingChat)
chatInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    handleOutgoingChat();
  }
});

