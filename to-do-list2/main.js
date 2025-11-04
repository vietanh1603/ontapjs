const input = document.querySelector('.to-do input');
const addBtn = document.querySelector('.to-do button');
const taskList = document.querySelector('.task-list');
const editPopup = document.querySelector('.edit-popup');
const delPopup = document.querySelector('.delete-popup');


const addTask = () => {
  const textList = input.value.trim()
  if(textList === '') {
    alert('you need to enter something')
  }
  else {
    const li = document.createElement('li')
    li.innerHTML =  `
    <span class="desc">
      <input type="checkbox" />
      <span>${textList}</span>
    </span>
    <span class="action">
      <button class="btn delete">Delete</button>
      <button class="btn edit">Edit</button>
    </span>
    `
    taskList.appendChild(li)
  }
  input.value = '';
}
addBtn.addEventListener('click', addTask)
taskList.addEventListener('click', (e) => {
  const target = e.target
  const checkbox = document.querySelector('input[type = "checkbox"]')
  if(target.tagName === 'LI'|| ) {}
})
