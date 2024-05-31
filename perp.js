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

  const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('http://127.0.0.1:8000/uploadfile',{
        method: 'POST', 
        body: formData
    })
    } catch (error) {
      console.error('Error uploading file', error)
    }
  } 

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
const middleSection = document.querySelector('.middlesection'); // Select the middle section
const questionButtons = document.querySelectorAll('.question-button'); // Select the question buttons


let userText = null;

const createElement = (html, className) => {
  const chatDiv = document.createElement('p');
  chatDiv.classList.add('chat', className);
  chatDiv.innerHTML = html;
  return chatDiv;
};

const getChatResponse = async (incomingChat) => {
  const API_URL = 'https://api.openai.com/v1/chat/completions';
  const pElement = document.createElement("p");

  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo-16k',
      messages: [
        //{ role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: userText },
      ],
      max_tokens: 2048,
      temperature: 0.2,
    }),  
      };

      try {
        const response = await (await fetch(API_URL, requestOptions)).json();
        if (response.choices && response.choices.length > 0) {
          pElement.textContent = response.choices[0].text.trim();
        } else {
          pElement.textContent = 'Error: No response from API';
        }
      } catch (error) {
        console.error(error);
        pElement.textContent = 'Error: Unable to fetch response';
      }

      incomingChat.querySelector('.typing-animation').remove();
      incomingChat.appendChild(pElement);
};

const showTypingAnimation = () => {
  const html = `<div class="typing-animation">
                    <div class="typing-dot" style="--delay: 0.2s"></div>
                    <div class="typing-dot" style="--delay: 0.3s"></div>
                    <div class="typing-dot" style="--delay: 0.4s"></div>
                </div>`;
  const incomingChat = createElement(html,'incoming');
  chatMessages.appendChild(incomingChat);
  getChatResponse(incomingChat);
};

const handleOutgoingChat = (text) => {
  userText = text || chatInput.value.trim(); //get chat input and remove whitespaces
  
  if (userText) {
  // Hide the middle section
  document.querySelector('.middlesection').style.display = 'none';
  document.querySelector('.chat-container').style.display = 'block';

  const html = `<p>${userText}</p>`;
  const outgoingChat = createElement(html,'outgoing');
  chatMessages.appendChild(outgoingChat); // Append the chat message to the chat container
  chatInput.value = ''; // Clear the input field after sending the message
  chatMessages.scrollTop = chatMessages.scrollHeight;
  setTimeout(showTypingAnimation, 500);
        }
    };

submitButton.addEventListener('click', handleOutgoingChat)
chatInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    handleOutgoingChat();
  }
});

// Add click event listeners to each question button
questionButtons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonText = button.querySelector('div').textContent.trim(); // Get the text content of the button
    handleOutgoingChat(buttonText); // Send the text as outgoing message
  });
});

