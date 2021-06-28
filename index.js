const searchBar = document.querySelector('#searchItem');
viewTodos();

function addTodo() {
  let input = document.getElementById('todoItem');

  if(input.value === ''){
    alert('Task name can not be empty')
  }

  else {
  let todoObj = {
      'taskName':input.value,
      'Complete':false
  }

  if(localStorage.getItem('todoList') === null){
      localStorage.setItem('todoList', '[]');
  };

  let oldTodos = JSON.parse(localStorage.getItem('todoList'));

  oldTodos.push(todoObj);
  input.value = null;
  addItem(todoObj,oldTodos.length-1);
  localStorage.setItem('todoList',JSON.stringify(oldTodos));
}
};

let addInput = document.getElementById("todoItem");
let updteInput = document.getElementById("updateItem");

addInput.addEventListener('keyup',(event) =>{
  if(event.keyCode === 13){
    document.getElementById('addButton').click();
  }
});


updteInput.addEventListener('keyup',(event)=>{
  if(event.keyCode === 13){
    document.getElementById('saveUpdate').click();
  }
});

function addItem(task,index) {
  let li = document.createElement('li');
  if(task.Complete === true){
    li.innerHTML = `<s>${task.taskName}</s>
      <button class="btn btn-danger btn-sm" onclick = "deletePopup(${index})">
        <i class="fa fa-trash"></i></button>
      <button class="btn btn-warning btn-sm" onclick = "updateTask(${index})">
        <i class="fa fa-refresh" aria-hidden="true"></i></button>
      <button  btn-sm" onclick = "markComplete(${index})" style='border:none;'>
        <img src = 'media/check.jpg' style='color:green; 
        height:25px;width:30px;' disabled></button>`;
  }
  else{
    li.innerHTML = `${task.taskName}
    <button class="btn btn-danger btn-sm" onclick = "deletePopup(${index})">
      <i class="fa fa-trash"></i></button>
    <button class="btn btn-warning btn-sm" onclick = "updateTask(${index})">
      <i class="fa fa-refresh" aria-hidden="true"></i></button>
    <button class="btn btn-primary btn-sm" onclick = "markComplete(${index})">
    MarkDone</button>`;
  }

  li.className="task-item"; 

  document.querySelector('.todo-list').append(li);
};

function deletePopup(index) {
  if(confirm(' Are you sure? ')) {
    deleteTask(index);
  }
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
  searchBar.value = null;
  if(localStorage.getItem('todoList') != null){
    todoList = JSON.parse(localStorage.getItem('todoList'));
  }

  for(let todo in todoList) {
    addItem(todoList[todo],todo);
  }
  
};    


const reduceFetch = (func,delay)=>{
  let timer;
  return function(...args){
      let that = this;
      if(timer){
        clearTimeout(timer);
      }
      timer = setTimeout(()=>{
        func(that,args);
      },delay);
  }
};

function dataFetch(field,args) {
  document.querySelector('.todo-list').innerHTML = '';
  let oldTodos = JSON.parse(localStorage.getItem('todoList'));
  let len = oldTodos.length;
  if(field.value === null){
    viewTodos();
  }
  else{
  for(let i=0; i<len; i++) {
    if(((oldTodos[i].taskName).toLowerCase()).indexOf((field.value).toLowerCase())>-1){
      addItem(oldTodos[i],i);
  }
}
}
};


searchBar.addEventListener('keyup',reduceFetch(dataFetch,300));
