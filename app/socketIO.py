import os
import datetime
# from app.models import channel
from flask_socketio import SocketIO, emit
# from .models import db, Message
from app.api.game_routes import currGames

# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://theslackx.herokuapp.com',
        'https://theslackx.herokuapp.com'
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)


# handle games messages
@socketio.on("games")
def handle_games(data):
    print('!!!!!!!!!!!!!!!!!!!!')
    print('HIT THE ROUTE', data)
    print(data["game_id"])

    game = currGames[data["game_id"]]

    # if game.joined_game < 2:
    #     game.joined_game += 1
    #     return
        # game[f"player{game.joined_game}"]

    
    if data['pNum'] == '1':
        print('IN 1 IF!!!!!!!!!!!!!!!!!!')
        game.player1.curr_play = data['moves']
        gameState = dict()
        gameState['player1'] = game.player1.to_dict()
        emit(f'{game.game_code}-1', gameState, broadcast=True)
        # return None
        # gameState['player1'] = game.player2.to_dict()

    if data['pNum'] == '2':
        print('IN 2 IF!!!!!!!!!!!!!!!!!!')
        game.player2.curr_play = data['moves']
        gameState = dict()
        gameState['player2'] = game.player2.to_dict()
        emit(f'{game.game_code}-2', gameState, broadcast=True)
        # return None

    if game.player1.curr_play and game.player2.curr_play:
        print('IN L IF!!!!!!!!!!!!!!!!!!')
        gameState = game.game_loop()
        emit(f'{game.game_code}-1', gameState, broadcast=True)
        emit(f'{game.game_code}-2', gameState, broadcast=True)
        # return None
    return None
    
        



#     new_message = Message(
#         user_id=data['user_id'],
#         channel_id=data['channel_id'],
#         body=data['body'],
#         created_at=data['created_at'],
#         updated_at=data['updated_at']
#     )

#     db.session.add(new_message)
#     db.session.commit()
#     messages = Message.query.filter(
#         Message.user_id == data['user_id'], Message.body == data['body']).all()
#     ourMsg = messages[len(messages) - 1]
#     data['id'] = ourMsg.id
#     emit(data["channel_id"], data, broadcast=True)


# @socketio.sockets.in()
# // now, it's easy to send a message to just the clients in a given room
# room = "abc123";
# io.sockets.in(room).emit('message', 'what is going on, party people?');

# // this message will NOT go to the client defined above
# io.sockets.in('foobar').emit('message', 'anyone in this room yet?');
