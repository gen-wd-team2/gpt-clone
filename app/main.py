from fastapi import FastAPI, Depends, UploadFile
from . langchain_helper import get_response_from_query, create_vector_db
import pickle
import os
import shutil



app = FastAPI()

@app.post("/uploadfile")
async def create_upload_file(file: UploadFile):
    file_path = os.path.join('./', 'uploaded.pdf')
    # Save the uploaded file to disk
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {'mes': 'file successfully uploaded'}

@app.get('/chat')
async def llm_response(response: str = Depends(get_response_from_query)):
      return {'res': response}