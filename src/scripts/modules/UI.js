//removeIf(production)
import {playersContainerDIV} from '../script.js'
//endRemoveIf(production)
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
//removeIf(production)
export default UI
//endRemoveIf(production)