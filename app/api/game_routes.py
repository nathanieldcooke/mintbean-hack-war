
import json
from flask import Blueprint, jsonify, session, request
from app.game.game import Game

game_routes = Blueprint('game', __name__)

currGames = {}

@game_routes.route('/')
def get_game():
    """
    starts game:
    creates game instance,
    uses game instances game code attribute to add game to currGames dict
    """
    currGame = Game()
    currGames[currGame.game_code] = currGame
    return {'code': currGame.game_code}
