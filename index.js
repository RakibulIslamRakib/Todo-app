

//let addButton = document.getElementById('addTask');

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

    let li = document.createElement('li');
    li.innerHTML=todoObj.taskName;
    li.className="task-item";
    document.querySelector('.todo-list').append(li);

    localStorage.setItem('todoList',JSON.stringify(oldTodos));
}


function viewTodos(){
    let todoList=[];
    if(localStorage.getItem('todoList')!=null){
        todoList=JSON.parse(localStorage.getItem('todoList'));
    }
    for(let todo in todoList){
        let li = document.createElement('li');
        li.innerHTML=todoList[todo].taskName;
        li.className="task-item";
        document.querySelector('.todo-list').append(li);
    }
}    
viewTodos();
