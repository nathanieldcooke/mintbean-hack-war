import os
import random
# import datetime

# from app.models import channel
from flask_socketio import SocketIO, emit
# from .models import db, Message
from app.api.game_routes import currGames

# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        # 'https://war-battleof3s.herokuapp.com'
        'http://war-battleof3s.herokuapp.com',
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)


# handle games messages
@socketio.on("games")
def handle_games(data):

    game = currGames[data["game_id"]]

    if data['pNum'] == '1':
        game.player1.curr_play = data['moves']
        gameState = dict()
        gameState['player1'] = game.player1.to_dict()
        emit(f'{game.game_code}-1', gameState, broadcast=True)


    if data['compPlayer']:
        compHand = game.player2.deck[:3]
        random.shuffle(compHand)
        game.player2.curr_play = compHand
    else:
        if data['pNum'] == '2':
            game.player2.curr_play = data['moves']
            gameState = dict()
            gameState['player2'] = game.player2.to_dict()
            emit(f'{game.game_code}-2', gameState, broadcast=True)


    if game.player1.curr_play and game.player2.curr_play:
        gameState = game.game_loop()
        emit(f'{game.game_code}-1', gameState, broadcast=True)
        if not data['compPlayer']:
            emit(f'{game.game_code}-2', gameState, broadcast=True)

    return None
    