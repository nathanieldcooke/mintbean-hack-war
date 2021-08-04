import os

from .config import Config
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
from .socketIO import socketio

# /////// FireBase DataBase
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

firebaseDict = {
    "type": "service_account",
    "project_id": "my-project-1578346497301",
    "private_key_id": "afd3d2ee23383b38e246667e11a5765e27888d3d",
    "private_key": Config.SECRET_KEY_FIREBASE,
    "client_email": "firebase-adminsdk-ixaq7@my-project-1578346497301.iam.gserviceaccount.com",
    "client_id": "110055589170027281249",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ixaq7%40my-project-1578346497301.iam.gserviceaccount.com"
}

cred = credentials.Certificate(firebaseDict)
firebase_admin.initialize_app(cred)

db=firestore.client()
# ///////

from .api.game_routes import game_routes

from .config import Config

app = Flask(__name__)

app.config.from_object(Config)

app.register_blueprint(game_routes, url_prefix='/api/game')

socketio.init_app(app)
# Application Security
CORS(app)

# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any 
# request made over http is redirected to https.
# Well.........

@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get(
                            'FLASK_ENV') == 'production' else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') == 'production' else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')

if __name__ == '__main__':
    socketio.run(app)
