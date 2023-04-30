const tasks = [];

const tasksList = document.getElementById("list");
const addTaskInput = document.getElementById("add");
const taskCounter = document.getElementById("tasks-counter");

console.log(taskCounter);

function addTaskToDom(task) {
  const li = document.createElement("li");
  li.innerHTML = `
    <input type="checkbox" id="${task.id}" ${task.done ? "checked" : ""}
    class="custom-checkbox">
    <label for="${task.id}">${task.text}</label>
    <img src="bin.svg" class="delete" data-id="${task.id}">
`;
    tasksList.appendChild(li);
}
function renderList() {
  tasksList.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    addTaskToDom(tasks[i]);
  }
  taskCounter.innerText = tasks.length;
}

function toggleTask(taskId) {
  const task = tasks.filter(function (task) {
    return task.id === taskId;
  });
  if (task.length > 0) {
    const currentTask = task[0];
    currentTask.done = !currentTask.done;
    renderList();
    showNotification("task toggled successfully");
    return;
  }
}

function deleteTask(taskId) {
  const newTasks = tasks.filter(function (task) {
    return task.id !== taskId;
  });
  tasks = newTasks;
  renderList();
  showNotification("task deleted successfully");
}

function addTask(task) {
  if (task) {
    tasks.push(task);
    console.log(tasks);
    renderList();
    showNotification("task added successfully");
    return;
  }
  showNotification("task can not be added");
}

function showNotification(text) {
  alert(text);
}

function handleInputKeypress(e) {
  if (e.key === "Enter") {
    const text = e.target.value;
    console.log("text", text);

    if (!text) {
      showNotification("task cant be empty");
      return;
    }
    const task = {
      text,
      id: Date.now().toString(),
      done: false,
    };
    e.target.value = "";
    addTask(task);
  }
}

addTaskInput.addEventListener("keyup", handleInputKeypress);
