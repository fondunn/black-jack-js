const startGame = document.getElementById('start-game')
const getCard = document.getElementById('get-card')
const stay = document.getElementById('stay')
const field = document.getElementById('field')
const playersContainer = document.getElementById('players-container')
const status = document.getElementById('status')

let playersCount = 4


startGame.addEventListener('click', () => {
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
                playerPoints: 0,
                
            })

            
        }
    }
    setActivePlayer(x = 0) {
        this.activePlayer = this.players[x].playerId;
    }

    setCard(card) {

        this.players[this.activePlayer].playerHand.push({card})

        this.players[this.activePlayer].playerPoints += card.weight

        status.innerText = this.players[this.activePlayer].playerPoints

        if (this.players[this.activePlayer].playerPoints > 21) {
            status.innerText = players.players[0].playerPoints
            this.activePlayer++
            if ( this.activePlayer > this.playersCount ) {
                console.log('all players finished')
                
            }
            else {
                let x = this.activePlayer
                this.setActivePlayer(x)
            }
        }
    }
}


class RenderUI {
    constructor(count) {
        this.count = count
        this.playersCards = []
    }

    initField() {}

    renderPlayer(title) {
        const playerDiv = document.createElement('div')
        playerDiv.classList.add('player')
        const h2 = document.createElement('h2')
        h2.innerText = `Player ${title+1}`

        const playerCardList = document.createElement('div')
        playerCardList.classList.add('p-card-list')
        playersContainer.append(playerDiv)
        
        playerDiv.appendChild(h2)

        playerDiv.appendChild(playerCardList)
    }

    renderPlayerCards(card) {
        this.playersCards.push(card)

        this.playersCards.map(item => {
            const playerCardList = document.getElementsByClassName('p-card-list')
            playerCardList.innerHTML(`dsdsds`)
        })
    }

    renderPlayers() {
        for( let i = 0; i < this.count; i++ ) {
            this.renderPlayer(i)
        }
    }

}


const deck = new Deck();
const players = new Players(playersCount);
const render = new RenderUI(playersCount);

render.renderPlayers()

deck.createDeck();
deck.shuffleDeck()


console.log(deck.deck);

players.createPlayer()
players.setActivePlayer(0)

getCard.addEventListener('click', () => {
    let card = deck.getCard()
    players.setCard(card)

    // console.log(card)
    render.renderPlayerCards(card)

})












// const playerDiv = document.createElement('div')
//             playerDiv.classList.add('player')
//             const h2 = document.createElement('h2')
//             h2.innerText = `Player ${i+1}`

//             const playerCardList = document.getElementById('div')
//             playersContainer.append(playerDiv)
//             playerDiv.appendChild(h2)

//             playerDiv.append(playerCardList)