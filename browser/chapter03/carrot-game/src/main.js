'use strict'
import Popup from './popup.js'
import Game from './game.js'

const game = new Game(3, 2, 2)
const gameFinishBanner = new Popup()

game.setGameStopListner(reason => {
  let message
  switch (reason) {
    case 'cancel':
      message = 'REPLAY❓'
      break
    case 'win':
      message = 'YOU WON 🎉'
      break
    case 'lose':
      message = 'YOU LOST 🙈'
      break
    default:
      throw new Error('not valid reason')
  }
  gameFinishBanner.showWithText(message)
})

gameFinishBanner.setClickListener(() => {
  game.start()
})
