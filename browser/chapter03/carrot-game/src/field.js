'use strict'

import { playCarrot } from './sound.js'

const CARROT_SIZE = 80

export const ItemType = Object.freeze({
  carrot: 'carrot',
  bug: 'bug'
})

export class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount
    this.bugCount = bugCount
    this.field = document.querySelector('.game__field')
    this.fieldRect = this.field.getBoundingClientRect()
    this.field.addEventListener('click', this.onClick)
  }

  init() {
    this.field.innerHTML = ''
    this._addItem(ItemType.carrot, this.carrotCount, 'img/carrot.png')
    this._addItem(ItemType.bug, this.bugCount, 'img/bug.png')
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick
  }

  _addItem(className, count, imgPath) {
    const x1 = 0
    const y1 = 0
    const x2 = this.fieldRect.width - CARROT_SIZE
    const y2 = this.fieldRect.height - CARROT_SIZE
    for (let i = 0; i < count; i++) {
      const img = document.createElement('img')
      img.setAttribute('class', className)
      img.setAttribute('src', imgPath)
      img.style.position = 'absolute'
      const x = randomNumber(x1, x2)
      const y = randomNumber(y1, y2)
      img.style.left = `${x}px`
      img.style.top = `${y}px`
      this.field.appendChild(img)
    }
  }

  onClick = event => {
    const { target } = event

    if (target.matches('.carrot')) {
      target.remove()
      playCarrot()
      this.onItemClick && this.onItemClick(ItemType.carrot)
    } else if (target.matches('.bug')) {
      this.onItemClick && this.onItemClick(ItemType.bug)
    }
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min
}
