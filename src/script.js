const startGame = document.getElementById('start-game')
const getCard = document.getElementById('get-card')
const stay = document.getElementById('stay')
const field = document.getElementById('field')
const playersContainer = document.getElementById('players-container')
const status = document.getElementById('status')

class RenderUI {
    initField() {
        
    }

}


startGame.addEventListener('click', () => {
    const game = new RenderUI()
    game.initField()
    startGame.style.display = 'none'
})


class Deck {
    constructor() {
        this.values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
        this.suits = ['♠︎','♣︎','♥︎','♦︎']
        this.deck = []
    }

    createDeck() {
        for(let i = 0; i< this.suits.length; i++){
            for(let j = 0; j< this.values.length; j++){
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
        // this.suits.forEach(suit => {
        //     this.values.forEach(value => {
        //         this.deck = [
        //             ...this.deck,
        //             {
        //                 suits: suit,
        //                 value: value,
        //                 weight: this.getWeight(value)
        //             }
        //         ]
        //     })
        // })
    }

    getWeight(value) {
        switch (value) {
            case 'J' :
            case 'Q' :
            case 'K' :
                return 10
            case 'A' : 
            return 11
        default : 
            return value
        }
    }

    shuffleDeck() {
        // for(let i = 0; i < this.deck.length; i++) {
        //     let y = Math.floor(Math.random() * this.deck.length) 
        //     [this.deck[i], this.deck[y]] = [this.deck[y], this.deck[i]]
        // }

        let randomT = this.deck.map((item, index) => {
            return {
                i: index,
                value: Math.random()
            }
        }).sort((a, b) => a.value - b.value)
        this.deck = randomT.map(({i}) => this.deck[i])
    }

    getCard() {
        const last = this.deck[this.deck.length - 1]
        this.deck.pop()
        return last
    }
}

class Players {
    constructor(playersCount) {
        this.playersCount = playersCount;
        this.activePlayer = null;
        this.players = []
    }

    createPlayer() {
        for (let i = 0; i < this.playersCount; i++) {
            this.players.push({
                playerId: i,
                playerHand: [],
                playerPoints: 0,
                isActive: false
            })

            
        }
    }
    setActivePlayer(id) {
        this.activePlayer = this.players[id]
    }

    setCard(playerId, card) {
        this.players[playerId].playerHand.push({card})
        this.players[playerId].playerPoints += card.weight

        status.innerText = players.players[0].playerPoints

        if (this.players[playerId].playerPoints > 21) {
            this.setActivePlayer(playerId+1)

        }
    }
}









const deck = new Deck();
deck.createDeck();
deck.shuffleDeck()
const z = deck.getCard()
const z1 = deck.getCard()
const z2 = deck.getCard()

console.log(deck.deck);
const players = new Players(6);
players.createPlayer()
players.setActivePlayer(0)

console.log(players.activePlayer);

players.setCard(0, z)
players.setCard(0, z1)
players.setCard(0, z2)

console.log(players.activePlayer);

players.setCard(0, z)
players.setCard(0, z1)
players.setCard(0, z2)

console.log(players.activePlayer);

// status.innerText = players.players[0].playerPoints










// const playerDiv = document.createElement('div')
//             playerDiv.classList.add('player')
//             const h2 = document.createElement('h2')
//             h2.innerText = `Player ${i+1}`

//             const playerCardList = document.getElementById('div')
//             playersContainer.append(playerDiv)
//             playerDiv.appendChild(h2)

//             playerDiv.append(playerCardList)