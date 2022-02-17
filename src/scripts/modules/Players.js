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