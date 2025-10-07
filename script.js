const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const clearAllBtn = document.getElementById('clearAll');

// Cargar tareas desde localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks();

// Agregar tarea
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

function addTask() {
  const text = taskInput.value.trim();
  if (text === '') return;

  const newTask = { text, completed: false };
  tasks.push(newTask);
  saveTasks();
  renderTasks();
  taskInput.value = '';
}

// Renderizar tareas
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';

    const span = document.createElement('span');
    span.textContent = task.text;
    span.addEventListener('click', () => toggleTask(index));

    const delBtn = document.createElement('button');
    delBtn.textContent = 'X';
    delBtn.className = 'delete';
    delBtn.addEventListener('click', () => deleteTask(index));

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

// Marcar como completada
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Eliminar tarea
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Eliminar todas las tareas
clearAllBtn.addEventListener('click', () => {
  tasks = [];
  saveTasks();
  renderTasks();
});

// Guardar en localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
