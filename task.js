const inProgressTasksContainer = document.querySelector(".in-progress");
const doneTasksContainer = document.querySelector(".done");
let editor = document.getElementById("adder-task");

/* 

[] Implémenter les dates de fin de tâches 
[] Implémenter les sous tâches
[] Implémenter les priorités de tâches
[] Implémenter les sections de tâches

Projet > Section > Tâche > Sous tâches

*/

// Fonction pour sauvegarder les tâches dans le stockage local
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Fonction pour charger les tâches à partir du stockage local
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTask(task.name, task.state)); // Ajouter chaque tâche chargée à la liste
}

// Fonction template pour créer n'importe quel bouton
function createButton(className, textContent, clickHandler) {
  let button = document.createElement("button");
  button.className = className;
  button.textContent = textContent;
  button.addEventListener("click", clickHandler);
  return button;
}

// Fonction pour créer les éléments d'une tâches
function createTaskElement() {
  const taskElement = document.createElement("div");
  taskElement.className = "task-form";

  const inputTaskName = setTaskName();
  taskElement.appendChild(inputTaskName);

  inputTaskName.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      addTask(inputTaskName.value, "in-progress");
      taskElement.remove();
    }
  });

  const cancelButton = createButton("task-button-cancel", "Cancel", () => {
    let buttonEditor = editor.firstElementChild;
    buttonEditor.style.display = "block";
    taskElement.remove();
    return;
  });
  taskElement.appendChild(cancelButton);

  const submitButton = createButton("task-button-submit", "Add a task", () => {
    addTask(inputTaskName.value, "in-progress");
    taskElement.remove();
  });

  taskElement.appendChild(submitButton);

  return taskElement;
}

// Fonction pour créer un imput
function setTaskName() {
  let input = document.createElement("input");
  input.className = "task-name";
  return input;
}

// Fonction pour initialiser une tâche
function toggleTaskCreationForm() {
  let buttonEditor = editor.firstElementChild;
  buttonEditor.style.display =
    buttonEditor.style.display === "none" ? "block" : "none";
  const taskForm = editor.querySelector(".task") || createTaskElement();
  editor.appendChild(taskForm);
}

// Function pour delete une task
function deleteTask(taskDiv) {
  taskDiv.remove();
  saveTasks(getTasksFromUI());
}

// Fonction pour ajouter une tâche après initialisation
function addTask(name, state) {
  if (!name || !name.trim()) {
    let buttonEditor = editor.firstElementChild;
    buttonEditor.style.display = "block";
    return; // Ignore empty or whitespace-only task names
  }

  let taskDiv = document.createElement("div");
  taskDiv.className = "task";

  if (state === "in-progress") {
    inProgressTasksContainer.appendChild(taskDiv);
  } else if (state === "done") {
    doneTasksContainer.appendChild(taskDiv);
  }

  const checkTask = createButton("task-check", "", () => {
    doneTasksContainer.appendChild(taskDiv);
    saveTasks(getTasksFromUI());
  });
  taskDiv.insertBefore(checkTask, taskDiv.firstElementChild);

  let taskTitle = document.createElement("div");
  taskTitle.className = "task-title";
  taskTitle.textContent = name;

  taskDiv.appendChild(taskTitle);

  const deleteButton = createButton("task-button", "Delete", () => {
    deleteTask(taskDiv);
  });
  taskDiv.appendChild(deleteButton);

  const editButton = createButton("task-button-edit", "Edit Task", () => {
    if (editButton.textContent === "Edit Task") {
      // Replace the text content with an input field
      let taskNameInput = setTaskName();

      taskNameInput.value = taskTitle.textContent;
      taskDiv.replaceChild(taskNameInput, taskTitle);

      // Change the edit button text to "Save"
      editButton.textContent = "Save";
    } else {
      let taskNameInput = document.querySelector(".task-name");
      // Save changes and restore original text
      taskTitle.textContent = taskNameInput.value;
      taskDiv.replaceChild(taskTitle, taskNameInput);
      editButton.textContent = "Edit Task";
      // Sauvegarder la liste mise à jour dans le stockage local
      saveTasks(getTasksFromUI());
    }
  });

  if (editButton.textContent == "Save") {
    let taskNameInput = document.querySelector(".task-name");
    taskNameInput.addEventListener("keydown", (event) => {
      if (event.keyCode === 13) {
        // Save changes and restore original text
        taskTitle.textContent = taskNameInput.value;
        taskDiv.replaceChild(taskTitle, taskNameInput);
        editButton.textContent = "Edit Task";
        // Sauvegarder la liste mise à jour dans le stockage local
        saveTasks(getTasksFromUI());
      }
    });
  }

  taskDiv.appendChild(editButton);

  let buttonEditor = editor.firstElementChild;
  buttonEditor.style.display = "block";
  // Sauvegarder la liste mise à jour dans le stockage local
  saveTasks(getTasksFromUI());
}

function getTasksFromUI() {
  const taskElements = document.querySelectorAll(".task");
  const tasks = [];
  taskElements.forEach((taskElement) => {
    const titleElement = taskElement.querySelector(".task-title");
    // Vérifiez si titleElement est différent de null avant d'accéder à sa propriété textContent
    if (titleElement) {
      const name = titleElement.textContent;
      const state = taskElement.parentNode.classList.contains("done")
        ? "done"
        : "in-progress";
      tasks.push({ name, state });
    }
  });
  return tasks;
}

// Chargement des tâches lors du chargement de la page
window.addEventListener("load", loadTasks);

editor.firstElementChild.addEventListener("click", toggleTaskCreationForm);
