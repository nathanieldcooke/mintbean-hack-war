import random

deckDict = {
    'https://warbattleof3cards.s3.us-west-1.amazonaws.com/ace-clubs.png': 13,
    'https://warbattleof3cards.s3.us-west-1.amazonaws.com/ace-diamonds.png': 13,
    'https://warbattleof3cards.s3.us-west-1.amazonaws.com/ace-heart.png': 13,
    'https://warbattleof3cards.s3.us-west-1.amazonaws.com/ace-spade.png': 13,

    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/king-clubs.png': 12,
    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/king-diamonds.png': 12,
    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/king-heart.png': 12,
    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/king-spade.png': 12,

    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/queen-clubs.png': 11,
    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/queen-diamonds.png': 11,
    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/queen-heart.png': 11,
    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/queen-spade.png': 11,

    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/jack-clubs.png': 10,
    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/jack-diamonds.png': 10,
    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/jack-heart.png': 10,
    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/jack-spade.png': 10,

    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/10-clubs.png': 9,
    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/10-diamonds.png': 9,
    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/10-heart.png': 9,
    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/10-spade.png': 9,

    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/9-clubs.png': 8,
    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/9-diamonds.png': 8,
    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/9-heart.png': 8,
    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/9-spade.png': 8,

    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/8-clubs.png': 7,
    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/8-diamonds.png': 7,
    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/8-heart.png': 7,
    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/8-spade.png': 7,

    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/7-clubs.png': 6,
    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/7-diamonds.png': 6,
    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/7-heart.png': 6,
    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/7-spade.png': 6,

    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/6-clubs.png': 5,
    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/6-diamonds.png': 5,
    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/6-heart.png': 5,
    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/6-spade.png': 5,

    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/5-clubs.png': 4,
    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/5-diamonds.png': 4,
    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/5-heart.png': 4,
    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/5-spade.png': 4,

    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/4-clubs.png': 3,
    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/4-diamonds.png': 3,
    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/4-heart.png': 3,
    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/4-spade.png': 3,

    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/3-clubs.png': 2,
    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/3-diamonds.png': 2,
    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/3-heart.png': 2,
    # 'https://warbattleof3cards.s3.us-west-1.amazonaws.com/3-spade.png': 2,

    'https://warbattleof3cards.s3.us-west-1.amazonaws.com/2-clubs.png': 1,
    'https://warbattleof3cards.s3.us-west-1.amazonaws.com/2-diamonds.png': 1,
    'https://warbattleof3cards.s3.us-west-1.amazonaws.com/2-heart.png': 1,
    'https://warbattleof3cards.s3.us-west-1.amazonaws.com/2-spade.png': 1,
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
