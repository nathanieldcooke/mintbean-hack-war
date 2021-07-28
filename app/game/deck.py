import random

deckDict = {
    'ace-clubs': {
        'val': 13,
        'img': 'ace-clubs.png'
    },
    'ace-diamonds': {
        'val': 13,
        'img': 'ace-clubs.png'
    },
    'ace-heart': {
        'val': 13,
        'img': 'ace-clubs.png'
    },
    'ace-spade': {
        'val': 13,
        'img': 'ace-clubs.png'
    }
}

class Deck:
    def __init__(self, players):
        self.players = players
        self.deckDict = deckDict
        self.deckList = self.build_deck()
        self.playerDecks = self.divide_deck()
    
    def build_deck(self):

        deck = list(self.deckDict.keys())
        random.shuffle(deck)

        if self.players == 3:
            deck.pop(0)

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