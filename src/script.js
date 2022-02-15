const startGame = document.getElementById('start-game')
const getCard = document.getElementById('get-card')
const stay = document.getElementById('stay')
const field = document.getElementById('field')
const playersContainerDIV = document.getElementById('players-container')
const status = document.getElementById('status')

let playersCount = 4

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
}

class Players {
    constructor(playersCount) {
        this.playersCount = playersCount;
        this.activePlayer = 0;
        this.players = []
    }

    createPlayer() {
        for (let i = 0; i < this.playersCount; i++) {
            this.players.push({
                playerId: i,
                playerHand: [],
                playerPoints: 0
            })
        }
    }
    setActivePlayer(x = 0) {
        this.activePlayer = this.players[x].playerId;
    }

    setCard(card) {
        if (this.players[this.activePlayer].playerPoints > 21) {
            this.activePlayer++
            status.innerText = 0
            this.players[this.activePlayer].playerHand.push({ card })
            this.players[this.activePlayer].playerPoints += card.weight
            status.innerText = this.players[this.activePlayer].playerPoints
        } 
        else {
            this.players[this.activePlayer].playerHand.push({ card })
            this.players[this.activePlayer].playerPoints += card.weight
            status.innerText = this.players[this.activePlayer].playerPoints
        }
    }
}

class UI {
    constructor(playerCount) {
        this.playerCard = []
        this.players = playerCount
    }

    renderPlayer(id) {
        const divPlayer = document.createElement('div')
        divPlayer.classList.add('player')
        divPlayer.setAttribute('id', `player${id}`)
        playersContainerDIV.appendChild(divPlayer)

        const h2 = document.createElement('h2')
        h2.innerText = `Player ${id}`

        const divCardList = document.createElement('div')
        divCardList.classList.add('p-card-list')
        divCardList.setAttribute('id', `player${id}-card-list`)

        divPlayer.appendChild(h2)

        const idx = document.getElementById(`player${id}`)
        idx.appendChild(divCardList)

        const total = document.createElement('p')
        total.setAttribute('id', `player${id}-total`)
        total.innerHTML = 'Total: 0'
        idx.appendChild(total)
    }

    renderPlayers() {
        for (let i = 0; i < this.players; i++) {
            this.renderPlayer(i + 1)
        }
    }
    renderCard(players) {
        console.log(players)
        const cardArr = players.players[players.activePlayer].playerHand
        const id = players.activePlayer + 1
        const div = document.getElementById(`player${id}-card-list`)
        const arr = cardArr.map((card, id) => {
            return [
                players.players[players.activePlayer].playerHand[id].card.suits,
                players.players[players.activePlayer].playerHand[id].card.value,
            ]
        })
        div.innerHTML = arr
        const total = document.getElementById(`player${id}-total`)
        total.innerHTML = `Total: ${players.players[players.activePlayer].playerPoints}`
    }
}

class Game {
    constructor() {
        this.ui = new UI(playersCount)
        this.deck = new Deck()
        this.players = new Players(playersCount)
    }

    startGame() {
        console.log('Game started')
        this.deck.createDeck();
        this.deck.shuffleDeck()
        this.players.createPlayer()
        this.players.setActivePlayer(0)
        this.ui.renderPlayers()
        getCard.addEventListener('click', () => {
            let card = this.deck.getCard()
            this.players.setCard(card)
            this.ui.renderCard(this.players)
        })
    }

    endGame() {
        console.log('End Game')
    }

    hit() {}

    stay() {
        status.innerHTML = 0
        this.players.activePlayer++
        if (this.players.activePlayer + 1 > playersCount) {
            this.endGame()
        }
    }
}

const game = new Game()

startGame.addEventListener('click', () => {
    startGame.style.display = 'none'
    game.startGame()
})

stay.addEventListener('click', () => {
    game.stay()
})
