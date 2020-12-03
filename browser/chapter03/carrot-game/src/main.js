'use strict'
import Popup from './popup.js'
import Field from './field.js'

const CARROT_COUNT = 5
const BUG_COUNT = 5
const GAME_DURATION_SEC = 5

const gameBtn = document.querySelector('.game__button')
const gameTimer = document.querySelector('.game__timer')
const gameScore = document.querySelector('.game__score')

const alertSound = new Audio('./sound/alert.wav')
const bgSound = new Audio('./sound/bg.mp3')
const bugSound = new Audio('./sound/bug_pull.mp3')
const winSound = new Audio('./sound/game_win.mp3')

let started = false
let score = 0
let timer = undefined

const gameFinishBanner = new Popup()

gameFinishBanner.setClickListener(startGame)

const gameField = new Field(CARROT_COUNT, BUG_COUNT)

gameField.setClickListener(onItemClick)

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame()
  } else {
    startGame()
  }
})

function onItemClick(item) {
  console.log(item)
  if (!started) return

  if (item === 'carrot') {
    score++
    updateScoreBoard()
    if (score === CARROT_COUNT) {
      finishGame(true)
    }
  } else if (item === 'bug') {
    finishGame(false)
  }
}

function initGame() {
  score = 0
  gameScore.textContent = CARROT_COUNT
  gameField.init()
}

function startGame() {
  started = true
  initGame()
  showStopButton()
  showTimerAndScore()
  startGameTimer()
  playSound(bgSound)
}

function stopGame() {
  started = false
  stopGameTimer()
  hideGameButton()
  gameFinishBanner.showWithText('REPLAY❓')
  playSound(alertSound)
  stopSound(bgSound)
}

function finishGame(win) {
  started = false
  hideGameButton()
  if (win) {
    playSound(winSound)
  } else {
    playSound(bugSound)
  }
  stopGameTimer()
  stopSound(bgSound)
  gameFinishBanner.showWithText(win ? 'YOU WON 🎉' : 'YOU LOST 🙈')
}

function showStopButton() {
  const icon = gameBtn.querySelector('.control')
  icon.classList.add('fa-stop')
  icon.classList.remove('fa-play')
  gameBtn.style.visibility = 'visible'
}

function hideGameButton() {
  gameBtn.style.visibility = 'hidden'
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible'
  gameScore.style.visibility = 'visible'
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC
  updateTimerText(remainingTimeSec)
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer)
      finishGame(CARROT_COUNT === score)
      return
    }
    updateTimerText(--remainingTimeSec)
  }, 1000)
}

function stopGameTimer() {
  clearInterval(timer)
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  gameTimer.textContent = `${minutes}:${seconds}`
}

function playSound(sound) {
  sound.currentTime = 0
  sound.play()
}

function stopSound(sound) {
  sound.pause()
}

function updateScoreBoard() {
  gameScore.textContent = CARROT_COUNT - score
}
