// import Game from ('./Game')
// import Deck from ('./Deck')
// import Players from ('./Players')
// import UI from ('./UI')



// window.addEventListener('load', () =>{
    const startGame = document.getElementById('start-game')
    const getCard = document.getElementById('get-card')
    const stay = document.getElementById('stay')
    const restart = document.getElementById('restart')
    const field = document.getElementById('field-container')
    const playersContainerDIV = document.getElementById('players-container')
    const status = document.querySelector('#status')
    
    restart.style.display = 'none'
    getCard.style.display = 'none'
    stay.style.display = 'none'
    
    
    let playersCount = 4
// window.addEventListener('load', () =>{
//     status.innerText = ""
// })