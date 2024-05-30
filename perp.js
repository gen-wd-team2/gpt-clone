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

