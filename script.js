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