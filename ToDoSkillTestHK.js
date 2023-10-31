(function(){
let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('textIP');
const tasksCounter = document.getElementById('counter');
// Default tasks for when page renders -------------//////
tasks=[
    {title :"Problem of the day by Coding Ninjas-studio",
    id : 1,
    completed : true},
    {title :"FrontEnd Skill test-2",
    id : 2,
    completed : false},
    {title :"Start React Video lectures and Projects",
    id : 3,
    completed : false},
    
    {title :"Daily DSA concepts",
    id : 4,
    completed : true},
    {title :"FrontEnd revision",
    id : 5,
    completed : false}
];
renderList ();
///------------------------------------------------//// 

console.log('Working');

function addTaskToDom(task){
    const li=document.createElement('li');
    li.innerHTML=` <input type="checkbox"  id="${task.id}"  class="check-box" ${task.completed ? 'checked': ''}>
                    <label for="${task.id}">${task.title}</label>
                    <img src=" Icons/circle_xmark.svg" alt="XMark" class="XMark"  data-id="${task.id}"> 
                    ` ;
    taskList.append(li);    
    
}

function renderList () {
    taskList.innerHTML ='';
    // for adding the tasks to list 
    for(let i=0; i <tasks.length;i++){
        addTaskToDom(tasks[i]);
    }
    // render the total number of list 
    tasksCounter.innerHTML =tasks.length;
}

function ToggleTask (taskId) {
    for(let i of tasks){
        if(i.id == taskId){
            i.completed =(! i.completed);
            // renderList();
            // showNotification("task toggled");
            break ;
        }
    }
    return;
}

function deleteTask (taskId) {
    const newTasks= tasks.filter(function(task){
        return task.id!==Number(taskId);
    });
    tasks=newTasks;

    renderList();
    // showNotification("task removed sucessfully");
    return;
}

function addTask (task) {
    tasks.push(task);
    renderList();
    // showNotification("Task added succcessfully");
    return;
}

function showNotification(text) {
    alert(text);
}

function handleInputKeyPress(e){
    if(e.key =='Enter'){
        const text=e.target.value;
        if(!text){
            showNotification("Task can't be empty");
            return;
        }
        // console.log(Date.now())
        // Create task Object 
        const task={
            title : text,
            id: Date.now(),
            completed : false
        }
        addTask(task);
        e.target.value ='';
    }
}
function handleClick(e){
    const target=e.target;
    // console.log(target);   // To check the target
    if(target.className === 'check-box' ){
        // console.log("check");
        const taaskID=target.id;                   
        ToggleTask(taaskID);
    }else if(target.className === 'XMark'){
        const taaskID=target.dataset.id; 
        const b=confirm("are u sure ? You want to delete the task ? ");
        if(b)
            deleteTask(taaskID);
    }
    else if(target.className === 'addBtn'){
        const text=addTaskInput.value; 
        if(!text){
            showNotification("Task can't be empty");
            return;
        } 
        // task Object 
        const task={
            title : text,
            id: Date.now(),
            completed : false
        }
        addTask(task);
        addTaskInput.value ='';
    }

}

// Event delegation 
function appInitilize(){
    // Add event listener to input text box 
    addTaskInput.addEventListener('keyup', handleInputKeyPress);
    document.addEventListener('click',handleClick);
}

appInitilize(); 
})();