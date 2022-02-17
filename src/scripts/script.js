// import Game from ('./Game')
// import Deck from ('./Deck')
// import Players from ('./Players')
// import UI from ('./UI')

let playersCount = 4

window.addEventListener('load', () =>{
    const startGame = document.getElementById('start-game')
    const getCard = document.getElementById('get-card')
    const stay = document.getElementById('stay')
    const restart = document.getElementById('restart')
    const field = document.getElementById('field-container')
    const playersContainerDIV = document.getElementById('players-container')
    let status = document.getElementById('status')
    
    restart.style.display = 'none'
    getCard.style.display = 'none'
    stay.style.display = 'none'
    status.innerText = ""
    
    let playersCount = 4
    
    const game = new Game()
    
    startGame.addEventListener('click', () => {
        startGame.style.display = 'none'
        game.startGame()
        game.init()
    })
})