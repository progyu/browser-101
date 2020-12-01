'use strict'

const field = document.querySelector('.game__field')
const fieldRect = field.getBoundingClientRect()
const CARROT_SIZE = 80

function initGame() {
  addItem('carrot', 5, 'img/carrot.png')
  addItem('bug', 5, 'img/bug.png')
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

initGame()
