// Lấy các phần tử cần dùng
const input = document.getElementById('to-do');
const addBtn = document.querySelector('.to-do button');
const taskList = document.querySelector('.task-list');

const editPopup = document.querySelector('.edit-popup');
const deletePopup = document.querySelector('.delete-popup');
const editInput = document.getElementById('edit-task');

let currentTask = null;

// -------------------- Thêm task --------------------
const addTask = () => {
  const taskText = input.value.trim();
  if (taskText === '') return;

  const li = document.createElement('li');
  li.innerHTML = `
    <span class="desc">
      <input type="checkbox" />
      <span>${taskText}</span>
    </span>
    <span class="action">
      <button class="btn delete">Delete</button>
      <button class="btn edit">Edit</button>
    </span>
  `;
  taskList.appendChild(li);
  input.value = '';
  saveData();
};

// Khi click nút Add
addBtn.addEventListener('click', addTask);

// Khi nhấn Enter trong input
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

// -------------------- Xử lý click trong danh sách --------------------
taskList.addEventListener('click', (e) => {
  const target = e.target;
  const li = target.closest('li');
  if (!li) return;

  // Click vào vùng <li> (trừ khi click nút Edit/Delete)
  if (target.tagName === 'LI' || target.closest('.desc')) {
    const checkbox = li.querySelector('input[type="checkbox"]');
    if (!target.classList.contains('edit') && !target.classList.contains('delete')) {
      checkbox.checked = !checkbox.checked;
      const spanText = li.querySelector('.desc span:last-child');
      spanText.classList.toggle('checked', checkbox.checked);
      saveData();
    }
  }

  // Nút Edit
  if (target.classList.contains('edit')) {
    currentTask = li;
    editInput.value = li.querySelector('.desc span:last-child').textContent;
    editPopup.style.display = 'block';
  }

  // Nút Delete
  if (target.classList.contains('delete')) {
    currentTask = li;
    deletePopup.style.display = 'block';
  }

  saveData();
});

// -------------------- Xử lý popup Edit --------------------
editPopup.addEventListener('click', (e) => {
  const target = e.target;

  if (target.classList.contains('overlay')) {
    editPopup.style.display = 'none';
  }

  if (target.textContent === 'Close') {
    editPopup.style.display = 'none';
  }

  if (target.textContent === 'Edit' && currentTask) {
    const newText = editInput.value.trim();
    if (newText !== '') {
      currentTask.querySelector('.desc span:last-child').textContent = newText;
    }
    editPopup.style.display = 'none';
  }

  saveData();
});

// -------------------- Xử lý popup Delete --------------------
deletePopup.addEventListener('click', (e) => {
  const target = e.target;

  if (target.classList.contains('overlay')) {
    deletePopup.style.display = 'none';
  }

  if (target.textContent === 'No') {
    deletePopup.style.display = 'none';
  }

  if (target.textContent === 'Yes' && currentTask) {
    currentTask.remove();
    deletePopup.style.display = 'none';
  }

  saveData();
});

// -------------------- Lưu và hiển thị từ localStorage --------------------
const saveData = () => {
  const tasks = [];
  taskList.querySelectorAll('li').forEach((li) => {
    const text = li.querySelector('.desc span:last-child').textContent;
    const checked = li.querySelector('input[type="checkbox"]').checked;
    tasks.push({ text, checked });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const showTask = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(({ text, checked }) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="desc">
        <input type="checkbox" ${checked ? 'checked' : ''} />
        <span class="${checked ? 'checked' : ''}">${text}</span>
      </span>
      <span class="action">
        <button class="btn delete">Delete</button>
        <button class="btn edit">Edit</button>
      </span>
    `;
    taskList.appendChild(li);
  });
};

showTask();
