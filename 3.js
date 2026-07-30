let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

renderTodo();

addBtn.addEventListener("click", addTodo);

function addTodo() {

    let task = taskInput.value.trim();

    if(task == ""){
        alert("Enter a task");
        return;
    }

    let todo = {
        text: task,
        completed: false
    };

    todos.push(todo);

    saveData();
    renderTodo();

    taskInput.value = "";
}

function renderTodo(){

    taskList.innerHTML = "";

    for(let i=0;i<todos.length;i++){

        createTodoItem(todos[i], i);

    }

}

function createTodoItem(todo,index){

    let li = document.createElement("li");

    if(todo.completed){
        li.classList.add("completed");
    }

    let left = document.createElement("div");

    let checkbox = document.createElement("input");
    checkbox.type="checkbox";
    checkbox.checked=todo.completed;

    checkbox.addEventListener("change",function(){

        todos[index].completed = checkbox.checked;
        saveData();
        renderTodo();

    });

    let span = document.createElement("span");
    span.innerText=" "+todo.text;

    left.appendChild(checkbox);
    left.appendChild(span);

    let actions = document.createElement("div");
    actions.className="actions";

    let editBtn=document.createElement("button");
    editBtn.innerText="Edit";

    editBtn.addEventListener("click",function(){

        let newTask=prompt("Edit Task",todo.text);

        if(newTask!=null && newTask.trim()!=""){
            todos[index].text=newTask;
            saveData();
            renderTodo();
        }

    });

    let deleteBtn=document.createElement("button");
    deleteBtn.innerText="Delete";

    deleteBtn.addEventListener("click",function(){

        todos.splice(index,1);

        saveData();
        renderTodo();

    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(left);
    li.appendChild(actions);

    taskList.appendChild(li);

}

function saveData(){

    localStorage.setItem("todos",JSON.stringify(todos));

}