class Player:
    def __init__(self, deck, player_dict):
        if player_dict:
            self.score = player_dict['score']
            self.deck = player_dict['deck']
            self.curr_play = player_dict['curr_play']
        else:
            self.score = 1000
            self.deck = deck
            self.curr_play = None

    @classmethod
    def updateScores(cls, scores, player1, player2):
        if scores.count(1) > scores.count(2):
            player1.score += 100
            player2.score -= 100
        elif scores.count(2) > scores.count(1):
            player2.score += 100
            player1.score -= 100

            
        if scores.count(1) == 3:
            player1.score += 200
            player2.score -= 200
        if scores.count(2) == 3:
            player2.score += 200
            player1.score -= 200


    @classmethod
    def updateDecks(cls, winLose, player1, player2):
        if winLose.count(1) > winLose.count(2):
            player1.addCardsToDeck(player2.curr_play)
            player2.removeCardsFromDeck(player2.curr_play)
        else:
            player2.addCardsToDeck(player1.curr_play)
            player1.removeCardsFromDeck(player1.curr_play)


    def addCardsToDeck(self, cards):
        self.rotateThree()
        for card in cards:
            self.deck.append(card)

    def removeCardsFromDeck(self, cards):
        for card in cards:
            self.deck.remove(card)

    def rotateThree(self):
        card1 = self.deck.pop(0)
        card2 = self.deck.pop(0)
        card3 = self.deck.pop(0)

        self.deck.append(card1)
        self.deck.append(card2)
        self.deck.append(card3)


    def to_dict(self):
        return {
            'score': self.score,
            'deck': self.deck,
            'curr_play': self.curr_play
        }
