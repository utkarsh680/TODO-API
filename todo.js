const tasks = []

const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const taskCounter = document.getElementById('tasks-counter');

console.log(taskCounter);

function renderList () {


}

function markTaskCompleted (taskId) {
    
}

function deleteTask (taskId) {
    const newTasks = tasks.filter(function (task) {
        return task.id !== taskId;
        });
        tasks = newTasks;
        renderList();
        showNotification('task deleted successfully');
}

function addTask (task) {
    if(task){
        tasks.push(task);
        console.log(tasks);
        renderList();
        showNotification('task added successfully');
        return;
    }
    showNotification('task can not be added');

}

function showNotification (text) {
    alert(text);
}

function handleInputKeypress (e) {
    if(e.key === 'Enter') {
        const text = e.target.value;
        console.log('text', text);

        if(!text){
            showNotification('task cant be empty');
            return;
        }
        const task = {
            text,
            id: Date.now().toString(),
            done:false
        }
        e.target.value = '';
        addTask(task);
        }
    }

addTaskInput.addEventListener('keyup', handleInputKeypress);