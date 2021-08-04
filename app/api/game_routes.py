import json
from flask import Blueprint, jsonify, session, request
from app.game.game import Game

game_routes = Blueprint('game', __name__)

@game_routes.route('/')
def get_game():
    from app import db
    """
    starts game:
    creates game instance,
    uses game instances game code attribute to add game to currGames dict
    """
    currGame = Game(False)

    db.collection('games').document(currGame.game_code).set(currGame.to_dict())

    return {'code': currGame.game_code}
