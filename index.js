
function addTodo(){
    let input = document.getElementById('todoItem')
    let newTodo = input.value;
    let todoObj={
        "taskName":newTodo,
        "Complete":false
    }
    if(localStorage.getItem('todoList')==null){
        localStorage.setItem('todoList','[]');
    }
    let oldTodos=JSON.parse(localStorage.getItem('todoList'));
    oldTodos.push(todoObj);
    input.value=null;
    addItem(todoObj.taskName);
    localStorage.setItem('todoList',JSON.stringify(oldTodos));
}

function addItem(task){
    let li = document.createElement('li');
    li.innerHTML=task;
    li.className="task-item";
    document.querySelector('.todo-list').append(li);
}

function viewTodos(){
    let todoList=[];
    if(localStorage.getItem('todoList')!=null){
        todoList=JSON.parse(localStorage.getItem('todoList'));
    }
    for(let todo in todoList){
        addItem(todoList[todo].taskName);
    }
}    
viewTodos();
