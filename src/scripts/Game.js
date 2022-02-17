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