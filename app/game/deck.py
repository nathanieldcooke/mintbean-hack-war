import random

deckDict = {
    'ace-clubs': 13,
    'ace-diamonds': 13,
    'ace-heart': 13,
    'ace-spade': 13,

    'king-clubs': 12,
    'king-diamonds': 12,
    'king-heart': 12,
    'king-spade': 12,

    'queen-clubs': 11,
    'queen-diamonds': 11,
    'queen-heart': 11,
    'queen-spade': 11,

    'jack-clubs': 10,
    'jack-diamonds': 10,
    'jack-heart': 10,
    'jack-spade': 10,

    '10-clubs': 9,
    '10-diamonds': 9,
    '10-heart': 9,
    '10-spade': 9,

    '9-clubs': 8,
    '9-diamonds': 8,
    '9-heart': 8,
    '9-spade': 8,

    '8-clubs': 7,
    '8-diamonds': 7,
    '8-heart': 7,
    '8-spade': 7,

    '7-clubs': 6,
    '7-diamonds': 6,
    '7-heart': 6,
    '7-spade': 6,

    '6-clubs': 5,
    '6-diamonds': 5,
    '6-heart': 5,
    '6-spade': 5,

    '5-clubs': 4,
    '5-diamonds': 4,
    '5-heart': 4,
    '5-spade': 4,

    '4-clubs': 3,
    '4-diamonds': 3,
    '4-heart': 3,
    '4-spade': 3,

    '3-clubs': 2,
    '3-diamonds': 2,
    '3-heart': 2,
    '3-spade': 2,

    '2-clubs': 1,
    '2-diamonds': 1,
    '2-heart': 1,
    '2-spade': 1,
}

class Deck:
    def __init__(self):
        self.players = 2
        self.deckDict = deckDict
        self.deckList = self.build_deck()
        self.playerDecks = self.divide_deck()
    
    def build_deck(self):

        deck = list(self.deckDict.keys())
        random.shuffle(deck)

        return deck

    def divide_deck(self):
        cardsPerPlayer = len(self.deckList) / self.players
        playerDecks = dict()
        pNum = 1
        cardsGiven = 0

        for card in self.deckList:
            if cardsGiven == cardsPerPlayer:
                cardsGiven = 0
                pNum += 1
            
            if f"player{pNum}" in playerDecks:
                playerDecks[f"player{pNum}"].append(card)
            else:
                playerDecks[f"player{pNum}"] = []
                playerDecks[f"player{pNum}"].append(card)
            cardsGiven += 1
        
        return playerDecks

            
# newDeck = Deck(2)
# print(newDeck.deckList)
# print(newDeck.playerDecks)
