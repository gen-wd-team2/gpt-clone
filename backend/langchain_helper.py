from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
from fastapi import Depends

load_dotenv()

llm = ChatOpenAI(model = 'gpt-3.5-turbo-0125')

def create_vector_db(file = 'uploaded.pdf'):
    docs = PyPDFLoader(file).load()
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    splits = text_splitter.split_documents(docs)
    db = FAISS.from_documents(documents=splits, embedding=OpenAIEmbeddings())
    return db

def get_response_from_query(query: str, db: FAISS = Depends(create_vector_db)):
    retriever = db.as_retriever(search_type="similarity", search_kwargs={'k': 6})
    retrieved_docs = retriever.invoke(query)
    docs_page_content = '.'.join([d.page_content for d in retrieved_docs])

    system_prompt = (
    "You are an assistant for question-answering tasks. "
    "Use the following pieces of retrieved context to answer "
    "the question. If you don't know the answer, say that you "
    "don't know. Use three sentences maximum and keep the "
    "answer concise."
    "\n\n"
    "{context}")


    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", system_prompt),
            ("human", "{input}"),
        ]
    )

    question_answer_chain = create_stuff_documents_chain(llm, prompt)
    rag_chain = create_retrieval_chain(retriever, question_answer_chain)

    response = rag_chain.invoke({"input": query, "context": docs_page_content})
    return response["answer"]


if __name__ == '__main__':
     print(get_response_from_query("what is pension"))