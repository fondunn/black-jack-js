const startGame = document.getElementById('start-game')
const getCard = document.getElementById('get-card')
const stay = document.getElementById('stay')
const restart = document.getElementById('restart')
const field = document.getElementById('field-container')
const playersContainerDIV = document.getElementById('players-container')
const gameStatus = document.getElementById('status')

restart.style.display = 'none'
getCard.style.display = 'none'
stay.style.display = 'none'
gameStatus.innerText = ""

let playersCount = 4