from sqlalchemy import Column, Integer, String

from .database import Base


class User(Base):
    __tablename__ = "users"

    email = Column(String,primary_key=True,unique=True, index=True)
    hashed_password = Column(String)
