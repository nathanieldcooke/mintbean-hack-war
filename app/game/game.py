import random
import string
from app.game.deck import Deck
from app.game.player import Player
# from deck import Deck
# from player import Player


class Game:

    def __init__(self, game_dict):
        if game_dict:
            self.deck = Deck(game_dict['deck'])
            self.playerDecks = game_dict['playerDecks']
            self.deck_vals = game_dict['deck_vals']
            self.game_code = game_dict['game_code']

            self.player1 = Player(False, game_dict['player1'])
            self.player2 = Player(False, game_dict['player2'])
        else:
            self.deck = Deck(False)
            self.playerDecks = self.deck.playerDecks
            self.deck_vals = self.deck.deckDict
            self.game_code = self.generate_game_code()

            self.player1 = Player(self.playerDecks['player1'], False)
            self.player2 = Player(self.playerDecks['player2'], False)            


    def generate_game_code(self):
        letters = string.ascii_uppercase
        code = ''.join(random.choice(letters) for _i in range(6))
        return code


    def game_loop(self):

        gameState = dict()
        winLose = self.buildWinLose()
        Player.updateScores(winLose, self.player1, self.player2)
        Player.updateDecks(winLose, self.player1, self.player2)

        over = self.game_over()

        gameState['winLose'] = winLose
        gameState['player1'] = self.player1.to_dict()
        gameState['player2'] = self.player2.to_dict()
        gameState['over'] = over

        if (over):
            print('do over stuff!!!')

        self.player1.curr_play = None
        self.player2.curr_play = None

        return gameState

    def game_over(self):
        if len(self.player1.deck) < 3:
            return 'p1 deck lose'
        if self.player1.score <= 0:
            return 'p1 score lose'
        if len(self.player2.deck) < 3:
            return 'p2 deck lose'
        if self.player2.score <= 0:
            return 'p2 score lose'
        return False

    def buildWinLose(self):
        winLose = []
        p1_moves = self.player1.curr_play
        p2_moves = self.player2.curr_play

        for i in [0, 1, 2]:
            if self.deck_vals[p1_moves[i]] == self.deck_vals[p2_moves[i]]:
                winLose.append(0)
            elif self.deck_vals[p1_moves[i]] > self.deck_vals[p2_moves[i]]:
                winLose.append(1)
            else:
                winLose.append(2)

        return winLose

    def to_dict(self):
        return {
            'deck': self.deck.to_dict(),
            'playerDecks': self.playerDecks,
            'deck_vals': self.deck_vals,
            'game_code': self.game_code,
            'player1': self.player1.to_dict(),
            'player2': self.player2.to_dict(),
        }
