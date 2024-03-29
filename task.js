let wrapperTask = document.getElementById("wrapper-task");

let addTaskButton = document.getElementById("adder-task");

var count = 1;

function addTask() {
  let myNewTask = document.createElement("div");
  myNewTask.textContent = count++;
}
