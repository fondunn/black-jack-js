//removeIf(production)
import Game from './modules/Game.js'
//endRemoveIf(production)

const startGame = document.getElementById('start-game')
const getCard = document.getElementById('get-card')
const stay = document.getElementById('stay')
const restart = document.getElementById('restart')
const field = document.getElementById('field-container')
const playersContainerDIV = document.getElementById('players-container')
const gameStatus = document.getElementById('status')
let playersCount = 4

restart.style.display = 'none'
getCard.style.display = 'none'
stay.style.display = 'none'
gameStatus.innerText = ""

startGame.addEventListener('click', () => {
    startGame.style.display = 'none'
    game.startGame()
    game.init()
})


//removeIf(production)
const game = new Game()
export {gameStatus, startGame, getCard, playersContainerDIV}
//endRemoveIf(production)