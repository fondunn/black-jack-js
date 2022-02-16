const startGame = document.getElementById('start-game')
const getCard = document.getElementById('get-card')
const stay = document.getElementById('stay')
const restart = document.getElementById('restart')
const field = document.getElementById('field-container')
const playersContainerDIV = document.getElementById('players-container')
const status = document.getElementById('status')

restart.style.display = 'none'
getCard.style.display = 'none'
stay.style.display = 'none'
status.innerText = ''

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

    reset() {
        this.deck = []
    }
}

class Players {
    constructor(playersCount) {
        this.playersCount = playersCount;
        this.activePlayer = 0;
        this.players = []

        this.ui = new UI();
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

    getActivePlayer(){
        return this.players.find(p => p.playerId === this.activePlayer)
    }

    nextPlayer() {
        const nextPlayerIndex = this.activePlayer + 1;
        if(nextPlayerIndex >this.playersCount) {
            throw new Error("Players end")
        }

        this.setActivePlayer(nextPlayerIndex);
    }

    setCard(card) {
        this.players[this.activePlayer].playerHand.push({ card })
        this.players[this.activePlayer].playerPoints += card.weight
        status.innerText = this.players[this.activePlayer].playerPoints
    }

    reset() {
        this.activePlayer = 0
        this.players = []
        this.playersCount = 4
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
        const cardArr = players.players[players.activePlayer].playerHand
        const id = players.activePlayer + 1
        const div = document.getElementById(`player${id}-card-list`)

        const playerContainer = document.getElementById(`player${id}`)
        playerContainer.classList.add('active')


        const arr = cardArr.map(card => `<span>${card.card.suits} ${card.card.value}</span>`)
        div.innerHTML = arr.map(el => el).join(' ')
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

    getCardListener = () => {
        let card = this.deck.getCard()
        this.players.setCard(card)
        this.ui.renderCard(this.players)
        this.check();
    }

    stayListener = () => {
        game.stay()
    }

    init() {
        getCard.addEventListener('click', this.getCardListener)

        stay.addEventListener('click', this.stayListener)
    }

    startGame() {
        this.deck.createDeck();
        this.deck.shuffleDeck()
        this.players.createPlayer()
        this.ui.renderPlayers()
        getCard.style.display = 'flex'
        stay.style.display = 'flex'
    }

    endGame() {
        let winnerPoints = 0
        let winner = null
        for (let i = 0; i < this.players.players.length; i++) {
            if (this.players.players[i].playerPoints > winnerPoints && this.players.players[i].playerPoints <= 21) {
                winnerPoints = this.players.players[i].playerPoints
                winner = this.players.players[i]
            }
        }

        getCard.style.display = 'none'
        stay.style.display = 'none'

        console.log(winner)
        !winner? status.innerHTML = 'No winner :(' : status.innerHTML = `winner is: Player ${winner.playerId+1}`
        
        // status.innerHTML = `winner is: Player ${winner.playerId+1}`
        restart.style.display = 'block'
        this.restart()
    }
    stay() {
        status.innerHTML = 0
        try{
            const playerContainer = document.getElementById(`player${this.players.activePlayer+1}`)
            playerContainer.classList.remove('active')
            this.players.nextPlayer()
        }catch(e){
            console.log(e);
            this.endGame()
        }
    }

    check(){
        const activePlayer = this.players.getActivePlayer();
        if (activePlayer.playerPoints > 21) {
            const playerContainer = document.getElementById(`player${this.players.activePlayer+1}`)
            playerContainer.classList.remove('active')
            status.innerText = 0
            try{
                this.players.nextPlayer();
            }catch(e){
                this.endGame();
            }
        }
        
    }

    restart() {
        restart.addEventListener('click', () => {
            console.log('restart pressed')
            restart.style.display = 'none'
            startGame.style.display = 'flex'
            status.innerHTML = 0
            this.players.reset()
            this.deck.reset()
            const playerDiv = document.getElementById('players-container')
            playerDiv.innerHTML = ''
            getCard.removeEventListener('click', this.getCardListener)
            stay.removeEventListener('click', this.stayListener)
        })
    }
}

const game = new Game()

startGame.addEventListener('click', () => {
    startGame.style.display = 'none'
    game.startGame()
    game.init()
})