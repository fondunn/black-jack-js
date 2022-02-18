//removeIf(production)
import UI from './UI.js'
import Players from './Players.js'
import Deck from './Deck.js'

import  {startGame, gameStatus, getCard} from '../script.js'
//endRemoveIf(production)
class Game {
    constructor() {
        this.ui = new UI(4)
        this.deck = new Deck()
        this.players = new Players(4)
    }

    getCardListener = () => {
        let card = this.deck.getCard()
        this.players.setCard(card)
        this.ui.renderCard(this.players)
        this.check();
    }

    stayListener = () => {
        this.stay()
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
        !winner? gameStatus.innerHTML = 'No winner :(' : gameStatus.innerHTML = `winner is: Player ${winner.playerId+1}`
        restart.style.display = 'block'
        this.restart()
    }
    stay() {
        gameStatus.innerHTML = 0
        try{
            const playerContainer = document.getElementById(`player${this.players.activePlayer+1}`)
            playerContainer.classList.remove('active')
            this.players.nextPlayer()
        }catch(e){
            // console.log(e);
            this.endGame()
        }
    }

    check(){
        const activePlayer = this.players.getActivePlayer();
        if (activePlayer.playerPoints > 21) {
            const playerContainer = document.getElementById(`player${this.players.activePlayer+1}`)
            playerContainer.classList.remove('active')
            gameStatus.innerText = 0
            try{
                this.players.nextPlayer();
            }catch(e){
                this.endGame();
            }
        }
    }

    restart() {
        restart.addEventListener('click', () => {
            restart.style.display = 'none'
            startGame.style.display = 'flex'
            gameStatus.innerHTML = 0
            this.players.reset()
            this.deck.reset()
            const playerDiv = document.getElementById('players-container')
            playerDiv.innerHTML = ''
            getCard.removeEventListener('click', this.getCardListener)
            stay.removeEventListener('click', this.stayListener)
        })
    }
}
//removeIf(production)
export default Game
//endRemoveIf(production)