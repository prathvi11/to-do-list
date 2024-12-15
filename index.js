// Select DOM elements
const newTaskInput = document.getElementById("new-task");
const addTaskBtn = document.getElementById("add-task-btn");
const todoList = document.getElementById("todo-list");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to render tasks
function renderTasks() {
  todoList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.classList.add("todo-item");
    if (task.completed) {
      taskItem.classList.add("completed");
    }

    taskItem.innerHTML = `
      <span>${task.name}</span>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;

    // Toggle completed state
    taskItem.addEventListener("click", () => toggleTaskCompletion(index));

    todoList.appendChild(taskItem);
  });
}

// Function to add a task
function addTask() {
  const taskName = newTaskInput.value.trim();
  if (taskName) {
    tasks.push({ name: taskName, completed: false });
    newTaskInput.value = "";
    saveTasks();
    renderTasks();
  }
}

// Function to toggle task completion
function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Function to save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Event listeners
addTaskBtn.addEventListener("click", addTask);
todoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.dataset.index;
    deleteTask(index);
  }
});

// Initial render
renderTasks();
