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
const submitButton = document.querySelector('#askButton')



async function getMessage() {
    console.log('clicked')
    // const options = {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': 'Bearer ${API_KEY}',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         model: "gpt-3.5-turbo-16k",
    //         messages: [{role: "user", content: "Hello!"}],
    //         max_tokens: 100
    //         })  
    // }
    // try {
    //     const response = await fetch('https://api.openai.com/v1/chat/completions', options)
    //     const data = await response.json()
    //     console.log(data)
    // }
    // catch (error){
    //     console.error(error)
    // }
}

submitButton.addEventListener('click', getMessage)

