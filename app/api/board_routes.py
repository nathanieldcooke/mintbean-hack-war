import json
from flask import Blueprint, jsonify, session, request
from app.game import board

board_routes = Blueprint('board', __name__)

@board_routes.route('/')
def get_board():
    """
    Returns current board
    """
    print(board)
    row_obj = json.dumps()
    return row_obj
    # return 'Heloooooooooo'