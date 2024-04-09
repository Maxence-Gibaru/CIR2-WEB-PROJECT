import { createPopupWindow, createSubTaskEditor } from "./popupEditor.js";

const inProgressTasksContainer = document.querySelector(".in-progress");
const doneTasksContainer = document.querySelector(".done");

let editor = document.querySelector(".adder-task");

let editorButton = editor.firstElementChild;
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
  console.log(tasks);
  tasks.forEach((task) => addTask(task.name, task.state, task.date)); // Ajouter chaque tâche chargée à la liste
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
function createTaskForm(isSubtask = false, parentTaskName = null) {
  let choosedDate;

  const taskElement = document.createElement("div");
  taskElement.className = "task-form";

  const inputTaskName = setTaskName();
  taskElement.appendChild(inputTaskName);

  inputTaskName.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      const taskName = inputTaskName.value;
      if (isSubtask) {
        // Ici, ajoutez la sous-tâche à la tâche principale spécifiée
        addSubtask(false, parentTaskName, taskName, choosedDate);
      } else {
        // Ajoutez une tâche principale comme avant
        addTask(taskName, "in-progress", choosedDate);
      }
      taskElement.remove();
    }
  });

  const deadLineDate = createButton("task-date", "Date", () => {
    choosedDate = "today";
    deadLineDate.textContent = choosedDate;
  });
  taskElement.appendChild(deadLineDate);

  const cancelButton = createButton("task-button-cancel", "Cancel", () => {
    editorButton.style.display = "block";
    taskElement.remove();
    return;
  });
  taskElement.appendChild(cancelButton);

  const submitButton = createButton("task-button-submit", "Add a task", () => {
    const taskName = inputTaskName.value;
    if (isSubtask) {
      // Ici, ajoutez la sous-tâche à la tâche principale spécifiée
      addSubtask(false, parentTaskName, taskName, choosedDate);
    } else {
      // Ajoutez une tâche principale comme avant
      addTask(taskName, "in-progress", choosedDate);
    }
    taskElement.remove();
  });

  taskElement.appendChild(submitButton);

  return taskElement;
}

// Fonction pour créer un imput
function setTaskName() {
  let input = document.createElement("input");
  input.className = "task-input";
  input.placeholder = "Name of task";
  return input;
}

// Fonction pour initialiser une tâche
function toggleTaskCreationForm() {
  editorButton.style.display =
    editorButton.style.display === "none" ? "block" : "none";
  const taskForm = editor.querySelector(".task") || createTaskForm();
  editor.appendChild(taskForm);
}

// Function pour delete une task
function deleteTask(taskDiv) {
  taskDiv.remove();
  saveTasks(getTasksFromUI());
}

function createTaskPanel(taskElement) {
  let popupWindow = createPopupWindow();

  let taskName = taskElement.querySelector(".task-title").textContent;
  createSubTaskEditor(taskName, popupWindow);
  document.body.appendChild(popupWindow);

  let subTaskButtonContainer = document.createElement("div");
  let adderSubTask = createButton("sub-adder-task", "Add a subtask", () => {
    adderSubTask.style.display = "none";
    let subTaskForm = createTaskForm(true, taskName);
    popupWindow.appendChild(subTaskForm);
  });

  const tasks = JSON.parse(localStorage.getItem("tasks") || []);
  const taskIndex = tasks.findIndex((task) => task.name === taskName);

  /* popupWindow.appendChild(taskElement); */
  popupWindow.appendChild(subTaskButtonContainer);
  subTaskButtonContainer.appendChild(adderSubTask);

  tasks[taskIndex].subTasks.forEach((subTask) => {
    console.log(subTask);
    addSubtask(true, taskName, subTask.name, subTask.date);
  });
}

function findTaskByName(taskName) {
  const taskElements = document.querySelectorAll(".task");
  taskElements.forEach((taskElement) => {
    const name = taskElement.querySelector(".task-title").textContent;
    if (taskName === name) {
      return taskElement;
    } else {
      return;
    }
  });
}

// Fonction pour ajouter une tâche après initialisation
function addTask(name, state, date) {
  if (!name || !name.trim()) {
    editorButton.style.display = "block";
    return; // Ignore empty or whitespace-only task names
  }

  let taskElement = document.createElement("div");
  taskElement.className = "task";

  let taskProperties = document.createElement("div");
  taskProperties.className = "task-properties";

  taskElement.appendChild(taskProperties);

  let buttonFilter = document.querySelector(".button-filter");
  let wrapperTask = document.querySelector(".wrapper-task");

  if (date === buttonFilter.textContent.toLowerCase()) {
    wrapperTask.appendChild(taskElement);
  }
  /* if (state === "in-progress") {
    inProgressTasksContainer.appendChild(newTask);
  } else if (state === "done") {
    doneTasksContainer.appendChild(newTask);
  } */

  const checkTask = createButton("task-check", "", () => {
    /* doneTasksContainer.appendChild(taskDiv); */
    deleteTask(taskElement);
    saveTasks(getTasksFromUI());
  });
  taskProperties.appendChild(checkTask);

  let taskTitle = document.createElement("div");
  taskTitle.className = "task-title";
  taskTitle.textContent = name;

  taskTitle.addEventListener("click", () => {
    createTaskPanel(taskElement);
  });

  taskProperties.appendChild(taskTitle);

  let taskDate = document.createElement("div");
  taskDate.textContent = date;
  taskDate.className = "task-date";
  taskProperties.appendChild(taskDate);

  let taskSettings = document.createElement("div");
  taskSettings.className = "task-settings";

  taskElement.appendChild(taskSettings);

  const deleteButton = createButton("task-button", "Delete", () => {
    deleteTask(taskElement);
  });
  taskSettings.appendChild(deleteButton);

  const editButton = createButton("task-button-edit", "Edit Task", () => {
    if (editButton.textContent === "Edit Task") {
      // Replace the text content with an input field
      let taskNameInput = setTaskName();

      taskNameInput.value = taskTitle.textContent;
      taskProperties.replaceChild(taskNameInput, taskTitle);

      // Change the edit button text to "Save"
      editButton.textContent = "Save";

      // Ajouter immédiatement l'écouteur pour "Entrée" sur le nouveau champ de saisie
      taskNameInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          // Utilisation de 'event.key' pour une meilleure compatibilité
          // Sauvegarder les changements et restaurer le texte original
          taskTitle.textContent = taskNameInput.value;
          taskProperties.replaceChild(taskTitle, taskNameInput);
          editButton.textContent = "Edit Task";
          // Sauvegarder la liste mise à jour dans le stockage local
          saveTasks(getTasksFromUI());
        }
      });
    } else {
      let taskNameInput = document.querySelector(".task-input");
      // Save changes and restore original text
      taskTitle.textContent = taskNameInput.value;
      taskProperties.replaceChild(taskTitle, taskNameInput);
      editButton.textContent = "Edit Task";
      // Sauvegarder la liste mise à jour dans le stockage local
      saveTasks(getTasksFromUI());
    }
  });

  if (editButton.textContent == "Save") {
    let taskNameInput = document.querySelector(".task-input");
    taskNameInput.addEventListener("keydown", (event) => {
      if (event.keyCode === 13) {
        // Save changes and restore original text
        taskTitle.textContent = taskNameInput.value;
        taskElement.replaceChild(taskTitle, taskNameInput);
        editButton.textContent = "Edit Task";
        // Sauvegarder la liste mise à jour dans le stockage local
        saveTasks(getTasksFromUI());
      }
    });
  }

  taskSettings.appendChild(editButton);

  editorButton.style.display = "block";
  // Sauvegarder la liste mise à jour dans le stockage local
  saveTasks(getTasksFromUI());
}

function addSubtask(created = false, parentTaskName, taskName, choosedDate) {
  let parentTask = findTaskByName(parentTaskName);
  let popupWindow = document.querySelector(".popup-window");
  let subTaskAdder = document.querySelector(".sub-adder-task");
  let subTaskElement = document.createElement("div");

  const tasks = JSON.parse(localStorage.getItem("tasks") || []);
  const parentTaskIndex = tasks.findIndex(
    (task) => task.name === parentTaskName
  );

  if (parentTaskIndex !== -1 && !created) {
    const subTask = {
      name: taskName,
      state: "in-progress",
      date: choosedDate,
      subTasks: [],
    };

    tasks[parentTaskIndex].subTasks.push(subTask);

    saveTasks(tasks);
  }

  popupWindow.appendChild(subTaskElement);

  subTaskElement.textContent = taskName;

  subTaskAdder.style.display = "block";

  /* saveTasks() */
}

// à changer
function getTasksFromUI() {
  const taskElements = document.querySelectorAll(".task");
  const tasks = [];
  taskElements.forEach((taskElement) => {
    const titleElement = taskElement.querySelector(".task-title");
    const dateElement = taskElement.querySelector(".task-date");
    // Vérifiez si titleElement est différent de null avant d'accéder à sa propriété textContent
    if (titleElement) {
      const name = titleElement.textContent;
      const state = taskElement.parentNode.classList.contains("done")
        ? "done"
        : "in-progress";
      const date = dateElement.textContent;
      const subTasks = [];
      tasks.push({ name, state, date, subTasks });
    }
  });
  return tasks;
}

// Chargement des tâches lors du chargement de la page
window.addEventListener("load", loadTasks);

editorButton.addEventListener("click", toggleTaskCreationForm);
