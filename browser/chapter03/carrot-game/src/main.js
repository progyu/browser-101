'use strict'

import Popup from './popup.js'
import * as sound from './sound.js'
import { GameBuilder, Reason } from './game.js'

const game = new GameBuilder()
  .withGameDuration(3)
  .withCarrotCount(2)
  .withBugCount(2)
  .build()
const gameFinishBanner = new Popup()

game.setGameStopListner(reason => {
  let message
  switch (reason) {
    case Reason.cancel:
      message = 'REPLAY❓'
      sound.playAlert()
      break
    case Reason.win:
      message = 'YOU WON 🎉'
      sound.playWin()
      break
    case Reason.lose:
      message = 'YOU LOST 🙈'
      sound.playLost()
      break
    default:
      throw new Error('not valid reason')
  }
  gameFinishBanner.showWithText(message)
})

gameFinishBanner.setClickListener(() => {
  game.start()
})
