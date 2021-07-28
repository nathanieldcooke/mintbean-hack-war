import random
import string
from app.game.deck import Deck


class Game:
    def __init__(self, players):
        self.players = players
        self.deck = Deck(players)
        self.playerDecks = self.deck.playerDecks
        self.deck = self.deck.deckDict
        self.game_code = self.generateGameCode()

    def generateGameCode(self):
        letters = string.ascii_uppercase
        code = ''.join(random.choice(letters) for _i in range(6))
        return code


# game = Game(2)

# print(game.players)
# print(game.playerDecks)
# print(game.game_code)

