let todos = JSON.parse(localStorage.getItem('todos')) || []

const input = document.getElementById('todo-input')
const form = document.getElementById('todo-form')
const list = document.getElementById('list')

function render() {
	localStorage.setItem('todos', JSON.stringify(todos))
	list.innerHTML = ''

	todos.forEach((t, i) => {
		list.innerHTML += `
      <li class="todo__item${t.completed ? ' todo__item--completed' : ''}">
        <input type="checkbox" ${t.completed ? 'checked' : ''} data-i="${i}">
        <span>${t.text}</span>
        <button class="todo__delete" data-i="${i}">&times;</button>
      </li>
    `
	})
}

form.onsubmit = e => {
	e.preventDefault()
	if (input.value.trim()) {
		todos.push({ text: input.value.trim(), completed: false })
		input.value = ''
		render()
	}
}

list.onclick = e => {
	const i = +e.target.dataset.i
	if (e.target.tagName === 'BUTTON') todos.splice(i, 1)
	if (e.target.type === 'checkbox') todos[i].completed = !todos[i].completed
	render()
}

render()
