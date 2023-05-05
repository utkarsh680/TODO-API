
  let tasks = [];
  const tasksList = document.getElementById("list");
  const addTaskInput = document.getElementById("add");
  const taskCounter = document.getElementById("tasks-counter");
  
  var a = 10;
  
   async function fetchTodos (){
    // GET request using fetch()
    // fetch('https://jsonplaceholder.typicode.com/todos')
    // .then(function (response) {
    //   return response.json();
    // }).then(function (data) {
    //   tasks = data.slice(0, 10);
    //   renderList();
    // })
    // .catch(function (error) { 
    //   console.log('Request failed', error);
    // });
  try{
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    tasks = data.slice(0, 10);
    renderList();
  }
  catch(error){
    console.log('Request failed', error);
  }
}
  
  // add task to dom function
  function addTaskToDom(task) {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" id="${task.id}" ${task.completed ? "checked" : ""}
      class="custom-checkbox">
      <label for="${task.id}">${task.title}</label>
      <img src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png" class="delete" data-id="${task.id}">
  `;
      tasksList.appendChild(li);
  }
  
  // render list function
  function renderList() {
    tasksList.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
      addTaskToDom(tasks[i]);
    }
    taskCounter.innerText = tasks.length;
  }
  
  // toggle task function
  function toggleTask(taskId) {
    console.log(typeof(taskId));
    const task = tasks.filter(function (task) {
      return task.id === Number(taskId);
    });
    if (task.length > 0) {
      const currentTask = task[0];
      currentTask.completed = !currentTask.completed;
      renderList();
      showNotification("task toggled successfully");
      return;
    }
    showNotification("task can not be toggled");
  }
  
  // delete task function
  function deleteTask(taskId) {
    const newTasks = tasks.filter(function (task) {
      return task.id !== Number(taskId);
    })
    tasks = newTasks;
    renderList();
    showNotification("task deleted successfully");
   
  }
  
  // add task function
  function addTask(task) {
    if (task) {
    // fetch('https://jsonplaceholder.typicode.com/todos',{
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(task),
  
    // })
    // .then(function (response) {
    //   return response.json();
    // }).then(function (data) {
    //   console.log('Success:', data);
    //   tasks.push(task);
    //   console.log(tasks);
    //   renderList();
    //   showNotification("task added successfully");
    // })
    // .catch(function (error) { 
    //   console.log('Request failed', error);
    // });
  
    tasks.push(task);
    renderList();
    showNotification("task added successfully");
    return;  
    }
    showNotification("task can not be added");
  }
  
  // show notification
  function showNotification(text) {
    alert(text);
  }
  
  // handle input keypress
  
  function handleInputKeypress(e) {
    if (e.key === "Enter") {
      const text = e.target.value;
      console.log("text", text);
  
      if (!text) {
        showNotification("task cant be empty");
        return;
      }
      const task = {
        title:text,
        id: Date.now(),
        completed: false,
      };
      e.target.value = "";
      addTask(task);
    }
  }
  // handle click listener
  function handleClickListener(e) {
      const target = e.target;
      console.log(target);
  
      if (target.className === 'custom-checkbox'){
          const taskId = target.id;
          toggleTask(taskId);
          return;
      }else if(target.className === 'delete'){
          const taskId = target.dataset.id;
          deleteTask(taskId);
          return;
      }
  }
  
  function initializeApp(){
    fetchTodos();
    addTaskInput.addEventListener("keyup", handleInputKeypress);
    document.addEventListener('click', handleClickListener);
  }
  
  initializeApp();


