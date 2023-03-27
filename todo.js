const todoInput = document.querySelector("#todo-input");
const addButton = document.querySelector("#add-button");
const todoList = document.querySelector("#todo-list");


function saveToLocal(todo){
 // alert(todo);
 let todos;
 if(localStorage.getItem("todos")===null){
  todos = [];
 }else{
  todos = JSON.parse(localStorage.getItem("todos"));
 }

 todos.push(todo);
 localStorage.setItem("todos",JSON.stringify(todos));
}

function addTodo(e) {
  e.preventDefault();
  const newDiv = document.createElement("div");
  newDiv.classList.add("todo");
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-content");
  newDiv.appendChild(newTodo);

  saveToLocal(todoInput.value);

  const completedButton = document.createElement("button");
  completedButton.innerText = "완료";
  completedButton.classList.add("completed-button");
  newDiv.appendChild(completedButton);

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "삭제";
  deleteButton.classList.add("delete-button");
  newDiv.appendChild(deleteButton);

  todoList.appendChild(newDiv);
  todoInput.value="";

}

function getLocal(){
  let todos;
  if(localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    //스토리지에서 todos 값을 가져옵니다.
  }

  todos.forEach(function(todo){ //todos 요소마다 반복
    //alert(todo);
    const newDiv = document.createElement("div");
    newDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todo; //로컬스토리지의 값을 표시
    newTodo.classList.add("todo-content");
    newDiv.appendChild(newTodo);

    const completeButton = document.createElement("button");
    completeButton.innerText = "완료";
    completeButton.classList.add("completed-button");
    newDiv.appendChild(completeButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerText="삭제";
    deleteButton.classList.add("delete-button");
    newDiv.appendChild(deleteButton);
    todoList.appendChild(newDiv);

    todoInput.value="";
  })
}


function removeLocal(todo){
  let todos; //로컬스토리지에서 가져온 할 일들
  if(localStorage.getItem("todos")===null) {
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'));
    
  }

 // console.log(todo);
 const index = todos.indexOf(todo.children[0].innerText); //삭제할 요소
 console.log(index);
 todos.splice(index,1); //index번째 요소를 삭제
 localStorage.setItem('todos',JSON.stringify(todos));
}

function manageTodo(e) {
  const whichButton = e.target.classList[0]; //클릭한 부분의 class명을 가져옵니다.
  if(whichButton === 'completed-button') { //완료 버튼이면
    const todo = e.target.parentElement;
    todo.children[0].classList.toggle("completed");
    // 내용 부분에 .completed 클래스에 토글합니다.

  }else if(whichButton === 'delete-button') { // 삭제 버튼이면
    const todo = e.target.parentElement;
    removeLocal(todo); // 삭제 버튼의 부모요소를 삭제
    todo.remove();

  }
}
// let arr = ["kim","Lee","dong"];
// arr.forEach((item)=>{
//   console.log(item);
// })
//이벤트 처리
addButton.addEventListener("click",addTodo);
document.addEventListener("DOMContentLoaded",getLocal);
todoList.addEventListener("click",manageTodo);