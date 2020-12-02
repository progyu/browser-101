'use strict'

const CARROT_SIZE = 80
const CARROT_COUNT = 5
const BUG_COUNT = 5
const GAME_DURATION_SEC = 5

const field = document.querySelector('.game__field')
const fieldRect = field.getBoundingClientRect()
const gameBtn = document.querySelector('.game__button')
const gameTimer = document.querySelector('.game__timer')
const gameScore = document.querySelector('.game__score')

const popup = document.querySelector('.pop-up')
const popupText = document.querySelector('.pop-up__message')
const popupRefresh = document.querySelector('.pop-up__refresh')

let started = false
let score = 0
let timer = undefined

field.addEventListener('click', onFieldClick)
gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame()
  } else {
    startGame()
  }
})
popupRefresh.addEventListener('click', () => {
  startGame()
  hidePopUp()
})

function startGame() {
  score = 0
  started = true
  initGame()
  showStopButton()
  showTimerAndScore()
  startGameTimer()
}

function stopGame() {
  started = false
  stopGameTimer()
  hideGameButton()
  showPopUpWithText('REPLAY❓')
}

function finishGame(win) {
  stopGame()
  showPopUpWithText(win ? 'YOU WON 🎉' : 'YOU LOST 🙈')
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

function showPopUpWithText(text) {
  popupText.textContent = text
  popup.classList.remove('pop-up--hide')
}

function hidePopUp() {
  popup.classList.add('pop-up--hide')
}

function initGame() {
  field.innerHTML = ''
  gameScore.textContent = CARROT_COUNT
  addItem('carrot', CARROT_COUNT, 'img/carrot.png')
  addItem('bug', BUG_COUNT, 'img/bug.png')
}

function onFieldClick(event) {
  if (!started) return

  const { target } = event

  if (target.matches('.carrot')) {
    target.remove()
    score++
    updateScoreBoard()
    if (score === CARROT_COUNT) {
      finishGame(true)
    }
  } else if (target.matches('.bug')) {
    stopGameTimer()
    finishGame(false)
  }
}

function updateScoreBoard() {
  gameScore.textContent = CARROT_COUNT - score
}

function addItem(className, count, imgPath) {
  const x1 = 0
  const y1 = 0
  const x2 = fieldRect.width - CARROT_SIZE
  const y2 = fieldRect.height - CARROT_SIZE
  for (let i = 0; i < count; i++) {
    const img = document.createElement('img')
    img.setAttribute('class', className)
    img.setAttribute('src', imgPath)
    img.style.position = 'absolute'
    const x = randomNumber(x1, x2)
    const y = randomNumber(y1, y2)
    img.style.left = `${x}px`
    img.style.top = `${y}px`
    field.appendChild(img)
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min
}
