 const input = document.getElementById('newTodo');
 const inputError = document.getElementById('inputError');
 const taskListEl = document.getElementById('taskList');
 const tabs = document.querySelectorAll('.tabs button');
 const deleteDoneBtn = document.querySelector('.delete-done');
 const deleteAllBtn = document.querySelector('.delete-all');
 const addBtn = document.getElementById('addBtn');
 let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

const saveTasks = () => localStorage.setItem('tasks', JSON.stringify(tasks));
const renderTasks = (filter = currentFilter) => {
  currentFilter = filter;
  tabs.forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.querySelector(.tabs button[data-filter="${filter}"]);
  if (activeBtn) activeBtn.classList.add('active');

  taskListEl.innerHTML = '';
  tasks.forEach((task, index) => {
    if ((filter === 'done' && !task.done) || (filter === 'todo' && task.done)) return;
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task' + (task.done ? ' done' : '');
    const text = document.createElement('span');
    text.textContent = task.text;

    const actions = document.createElement('div');
    actions.className = 'actions';
    const check = document.createElement('i');
    check.className = task.done ? 'far fa-check-square' : 'far fa-square';
    check.title = 'Toggle Done';
    check.onclick = () => {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      renderTasks();
    };
    const edit = document.createElement('i');
    edit.className = 'fas fa-pen';
    edit.title = 'Edit';
    edit.onclick = () => openEditPopup(index);
    const del = document.createElement('i');
    del.className = 'fas fa-trash';
    del.title = 'Delete';
    del.onclick = () => openDeletePopup(index);

    actions.appendChild(check);
    actions.appendChild(edit);
    actions.appendChild(del);

    taskDiv.appendChild(text);
    taskDiv.appendChild(actions);
    taskListEl.appendChild(taskDiv);
  });
};
const validateInput = text => {
  if (!text) return 'Task cannot be empty';
  if (!isNaN(text.charAt(0))) return 'Task must not start with a number';
  if (text.length < 5) return 'Task must be at least 5 characters';
  return '';
};
const addTask = () => {
  const value = inputField.value.trim();
  const error = validateInput(value);
  inputError.textContent = error;
  if (error) return;
  tasks.push({ text: value, done: false });
  inputField.value = '';
  saveTasks();
  renderTasks();
};
const openEditPopup = index => {
  const newText = prompt("Rename task:", tasks[index].text);
  if (newText !== null) {
    const error = validateInput(newText.trim());
    if (error) {
      alert(error);
    } else {
      tasks[index].text = newText.trim();
      saveTasks();
      renderTasks();
    }
  }
};
const openDeletePopup = index => {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
};

const deleteDoneTasks = () => {
  if (!tasks.some(t => t.done)) return alert("No tasks to delete");
  tasks = tasks.filter(task => !task.done);
  saveTasks();
  renderTasks();
};
const deleteAllTasks = () => {
  if (!tasks.length) return alert("No tasks to delete");
  tasks = [];
  saveTasks();
  renderTasks();
};

tabs.forEach(btn => btn.addEventListener('click', () => renderTasks(btn.dataset.filter)));
addBtn.addEventListener('click', addTask);
deleteDoneBtn.addEventListener('click', deleteDoneTasks);
deleteAllBtn.addEventListener('click', deleteAllTasks);

window.onload = () => renderTasks();