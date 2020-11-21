const horizontal = document.querySelector('.horizontal')
const vertical = document.querySelector('.vertical')
const target = document.querySelector('.target')
const tag = document.querySelector('.tag')

addEventListener('load', () => {
  const rect = target.getBoundingClientRect()
  const targetHalfWidth = rect.width / 2
  const targetHalfHeight = rect.height / 2

  document.addEventListener('mousemove', event => {
    const x = event.clientX
    const y = event.clientY

    vertical.style.transform = `translateX(${x}px)`
    horizontal.style.transform = `translateY(${y}px)`

    target.style.transform = `translate(${x - targetHalfWidth}px, ${
      y - targetHalfHeight
    }px)`

    tag.style.transform = `translate(${x}px, ${y}px)`

    tag.innerHTML = `${x}px, ${y}px`
  })
})
