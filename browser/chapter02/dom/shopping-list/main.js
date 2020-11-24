const items = document.querySelector('.items')
const input = document.querySelector('.footer__input')
const addBtn = document.querySelector('.footer__button')

function onAdd() {
  const text = input.value
  if (text === '') {
    input.focus()
    return
  }

  const item = createItem(text)
  items.appendChild(item)
  item.scrollIntoView({ behavior: 'smooth', block: 'center' })

  input.value = ''
  input.focus()
}
let id = 0
function createItem(text) {
  const itemRow = document.createElement('li')
  itemRow.setAttribute('class', 'item__row')
  itemRow.setAttribute('data-id', id)

  itemRow.innerHTML = `
    <div class="item" data-id=${id}>
      <span class="item__name">${text}</span>
      <button class="item__delete" data-id=${id}>
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
    <div class="item__divider"></div>
  `

  id++
  return itemRow
}

addBtn.addEventListener('click', () => {
  onAdd()
})

input.addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    onAdd()
  }
})

items.addEventListener('click', event => {
  const delBtn = event.target.closest('.item__delete')

  if (!delBtn) return

  const toBeDeleted = document.querySelector(
    `.item__row[data-id="${delBtn.dataset.id}"]`
  )

  toBeDeleted.remove()
})
