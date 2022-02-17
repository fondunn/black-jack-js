class Deck {
    constructor() {
        this.values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
        this.suits = ['♠︎', '♣︎', '♥︎', '♦︎']
        this.deck = []
    }

    createDeck() {
        for (let i = 0; i < this.suits.length; i++) {
            for (let j = 0; j < this.values.length; j++) {
                this.deck = [
                    ...this.deck,
                    {
                        suits: this.suits[i],
                        value: this.values[j],
                        weight: this.getWeight(this.values[j])
                    }
                ]
            }
        }
    }

    getWeight(value) {
        switch (value) {
            case 'J':
            case 'Q':
            case 'K':
                return 10
            case 'A':
                return 11
            default:
                return value
        }
    }

    shuffleDeck() {
        let randomT = this.deck.map((item, index) => {
            return {
                i: index,
                value: Math.random()
            }
        }).sort((a, b) => a.value - b.value)
        this.deck = randomT.map(({ i }) => this.deck[i])
    }

    getCard() {
        const last = this.deck[this.deck.length - 1]
        return this.deck.pop()
    }

    reset() {
        this.deck = []
    }
}
