viewTodos();

function addTodo() {
  let input = document.getElementById('todoItem')
  let newTodo = input.value;
  let todoObj={
      'taskName':newTodo,
      'Complete':false
  }

  if(localStorage.getItem('todoList') === null){
      localStorage.setItem('todoList', '[]');
  };

  let oldTodos=JSON.parse(localStorage.getItem('todoList'));

  oldTodos.push(todoObj);
  input.value=null;
  addItem(todoObj,oldTodos.length-1);
  localStorage.setItem('todoList',JSON.stringify(oldTodos));
};

function addItem(task,index) {
  let li = document.createElement('li');
  let complete = task.Complete?"Completed":"Mark as Completed";

  li.innerHTML=`${task.taskName} 
    <button class="button" onclick = "markComplete(${index})">${complete}
    </button>
    <button class="button" onclick = "updateTask(${index})">Update</button>
    <button class="button" onclick = "deleteTask(${index})">Delete</button>`;

  li.className="task-item"; 
  document.querySelector('.todo-list').append(li);
};

function markComplete(index) {
  let oldTodos = JSON.parse(localStorage.getItem('todoList'));

  oldTodos[index].Complete = true;
  localStorage.setItem('todoList',JSON.stringify(oldTodos));
  document.querySelector('.todo-list').innerHTML="";
  
  viewTodos();
};

function deleteTask(index) {
  let oldTodos=JSON.parse(localStorage.getItem('todoList'));

  oldTodos.splice(index,1);
  localStorage.setItem('todoList',JSON.stringify(oldTodos));
  document.querySelector('.todo-list').innerHTML = '';

  viewTodos();
};

function updateTask(index) {
  let inputForm = document.querySelector('.input-form');
  let oldTodos=JSON.parse(localStorage.getItem('todoList'));
  let updateForm = document.querySelector('.update-form');

  inputForm.style.display = 'none';
  document.getElementById('updateItem').value = oldTodos[index].taskName;
  document.getElementById('saveUpdate').dataset.index=index;
  updateForm.style.display = 'block';
};

function saveUpdate() {
  let updateForm = document.querySelector('.update-form');
  let inputForm = document.querySelector('.input-form');
  let index = document.getElementById('saveUpdate').dataset.index;
  let oldTodos=JSON.parse(localStorage.getItem('todoList'));
  let updateInput = document.getElementById('updateItem');

  document.getElementById('saveUpdate').value="";
  updateForm.style.display = 'none';
  inputForm.style.display = 'block';
  oldTodos[index].taskName = updateInput.value;
  localStorage.setItem('todoList',JSON.stringify(oldTodos));
  document.querySelector('.todo-list').innerHTML = '';

  viewTodos();
}

function viewTodos() {
  let todoList = [];

  if(localStorage.getItem('todoList') != null){
    todoList = JSON.parse(localStorage.getItem('todoList'));
  }

  for(let todo in todoList) {
    addItem(todoList[todo],todo);
  }
  
};    

function search() {
  document.querySelector('.others').style.display = 'none';
  document.querySelector('.search').style.display = 'block';

};

function home() {
  document.querySelector('.search').style.display = 'none';
  document.querySelector('.others').style.display = 'block';
};

function searchTodo(input) {
  document.querySelector('.todo-search').innerHTML = '';
  let oldTodos = JSON.parse(localStorage.getItem('todoList'));
  let len = oldTodos.length;
  for(var i=0; i<len; i++){
    if(((oldTodos[i].taskName).toLowerCase()).indexOf(input.toLowerCase())>-1){
      var li = document.createElement("li");
      var val = document.createTextNode(oldTodos[i].taskName);
      li.appendChild(val);
  
      document.querySelector('.todo-search').appendChild(li);
    }
  }
};

