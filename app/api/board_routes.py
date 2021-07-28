import json
from flask import Blueprint, jsonify, session, request
from app.game import game

game_routes = Blueprint('game', __name__)

@game_routes.route('/')
def get_game():
    """
    starts game
    """
    print(game)

    # return game
    return 'Heloooooooooo'