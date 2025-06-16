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