console.log("ok oppo");
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
// load event listener
loadEventListners();

// Load all event listners
function loadEventListners(){
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', addTask);
    console.log('inside function');
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keypress', filterTasks);
}

// get task
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //create list element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // create text node and append to li
        li.appendChild(document.createTextNode(task));
        // create a link item
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add html content
        link.innerHTML = '<i class="fa fa-remove"></i>';

        // Append link to li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);

    });

}

// Add task
function addTask(e){
    if(taskInput.value === ''){
        alert('add a task');
    }

    //create list element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // create a link item
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add html content
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Append link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
    
    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = '';
    

    e.preventDefault();
}

//Store Task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
     tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task 
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('are you sure?')){
            e.target.parentElement.parentElement.remove();
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }//console.log(e.target);
    }
}

// Remove task from localStorage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
     tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Clear tasks
function clearTasks(){
 //taskList.innerHTML = '';
 while(taskList.firstChild){
     taskList.removeChild(taskList.firstChild);

 }   
 clearTasksFromLocalStorage();
}

// Clear out all tasks from local storage
function clearTasksFromLocalStorage(){
    localStorage.clear();
}
//filter tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    console.log(text);
    const itemsInList = document.querySelectorAll('.collection-item');
    itemsInList.forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
        }else{
                task.style.display = 'none';
        }
    });
    

}