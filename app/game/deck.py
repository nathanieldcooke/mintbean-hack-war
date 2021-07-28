import random

deckDict = {
    'ace-clubs': 13,
    'ace-diamonds': 13,
    'ace-heart': 13,
    'ace-spade': 13,
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