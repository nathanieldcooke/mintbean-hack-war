
import json
from flask import Blueprint, jsonify, session, request
from app.game.game import Game

game_routes = Blueprint('game', __name__)

currGames = {}

@game_routes.route('/')
def get_game():
    """
    starts game
    """
    currGame = Game()

    # currGames[currGame.game_code] = currGame
    currGames[currGame.game_code] = currGame

    # data = dict()
    # data['player'] = 1
    # data['player_deck'] = currGame.playerDecks['player1']
    # data['deck_vals'] = currGame.deck_vals
    # return data
    return currGame.game_code
