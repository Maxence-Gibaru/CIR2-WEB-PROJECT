let myTask = document.getElementById("task");
var myTaskText = document.getElementById("task-name");
let buttonModifyTask = document.getElementById("task-modify");

let task = {
  taskName: "defaultName",
  taskDate
}

function modifyTask(textValue) {
  myTaskText.textContent = textValue;
}

buttonModifyTask.addEventListener("click", () => {
  modifyTask("caca");
});
