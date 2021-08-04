import os

class Config:
  SECRET_KEY=os.environ.get('SECRET_KEY')
  SECRET_KEY_FIREBASE=os.environ.get('SECRET_KEY_FIREBASE')
