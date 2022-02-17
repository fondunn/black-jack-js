const game = new Game()
    
    startGame.addEventListener('click', () => {
        startGame.style.display = 'none'
        game.startGame()
        game.init()
    })