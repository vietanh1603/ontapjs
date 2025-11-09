const input = document.getElementById("to-do");
input.focus();
const addBtn = document.querySelector(".to-do button");
const taskList = document.querySelector(".task-list");

const delPopup = document.querySelector(".delete-popup");
const editPopup = document.querySelector(".edit-popup");
const editInput = document.querySelector(".edit-popup input");
let currentTask = null;

const saveData = () => {
  const tasks = [];
  document.querySelectorAll(".task-list li").forEach((li) => {
    const text = li.querySelector(".desc span").textContent;
    const checked = li.querySelector(".desc input").checked;
    tasks.push({ text, checked });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = () => {
  const taskText = input.value.trim();
  if (taskText === "") {
    alert("ban vui long nhap gi do nhe");
  } else {
    const li = document.createElement("li");
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
    saveData();
  }
  input.value = "";
  input.focus();
};
addBtn.addEventListener("click", addTask);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

taskList.addEventListener("click", (e) => {
  const target = e.target;
  const li = target.closest("li");
  const span = li.querySelector(".desc span");
  const checkbox = li.querySelector(".desc input");
  if (target.tagName === "SPAN" || target.tagName === "LI") {
    checkbox.checked = !checkbox.checked;
  }
  if (checkbox.checked === true) {
    span.classList.add("checked");
  } else {
    span.classList.remove("checked");
  }

  if (target.classList.contains("delete")) {
    delPopup.style.display = "block";
    currentTask = li;
  }
  if (target.classList.contains("edit")) {
    editPopup.style.display = "block";
    editInput.focus();
    editInput.value = span.textContent;
    currentTask = li;
  }
  saveData();
});

delPopup.addEventListener("click", (e) => {
  const target = e.target;
  if (target.textContent === "No") {
    delPopup.style.display = "none";
  }
  if (target.textContent === "Yes") {
    currentTask.remove();
    delPopup.style.display = "none";
    saveData();
  }
  
});

editPopup.addEventListener("click", (e) => {
  const target = e.target;
  if (target.textContent === "Close") {
    editPopup.style.display = "none";
  }
  if (target.textContent === "Edit") {
    const newText = editInput.value;
    if (newText !== "") {
      currentTask.querySelector(".desc span").textContent = newText;
    }
    editPopup.style.display = "none";
  }
  saveData();
});
const showTask = () => {
  const data = JSON.parse(localStorage.getItem('tasks')) || [];
  taskList.innerHTML = '';
  data.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="desc">
        <input type="checkbox" ${task.checked ? 'checked' : ''} />
        <span class="${task.checked ? 'checked' : ''}">${task.text}</span>
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
