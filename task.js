var count = 1;

function createTask() {
  let myNewTask = document.createElement("div");
  myNewTask.className = "task";
  let taskName = document.createElement("div");
  taskName.className = "task-name";
  myNewTask.appendChild(taskName);
  taskName.textContent = count++;

  let taskButton = document.createElement("button");
  taskButton.className = "task-button";
  taskButton.textContent = "Delete";
  myNewTask.appendChild(taskButton);

  taskButton.addEventListener("click", () => {
    myNewTask.remove();
  });

  let modifyTask = document.createElement("button");
  modifyTask.className = "task-button-modify";
  modifyTask.textContent = "modify";
  myNewTask.appendChild(modifyTask);

  modifyTask.addEventListener("click", () => {
    taskName.textContent = "bouge";
  });

  return myNewTask;
}

function addTask() {
  const wrapperTask = document.getElementById("wrapper-task");
  const myNewTask = createTask();

  wrapperTask.appendChild(myNewTask);
}

function modifyTask() {}

document.getElementById("adder-task").addEventListener("click", addTask);
