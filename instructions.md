

start serve with the command `uvicorn app.main:app`
server has only 2 end points. one to upload `/uploadfile` a file and one to chat with the pdf `/chat`

first run a `pip install -r requirements.txt` before you start the server. you only need to do this ones to install the dependencies the server requires to run

Type `http://127.0.0.1:8000/docs` in your browser to access the docs for the server. Upload a file in `/uploadfile` the docs and try out the the `/chat` route