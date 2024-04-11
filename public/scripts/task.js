
import { loadTasks, saveTasks } from "./data.js";
import { addSubtaskToUI, createButton, createInputTask, createTaskForm } from "./dom-content/elementCreator.js";

/* const inProgressTasksContainer = document.querySelector(".in-progress");
const doneTasksContainer = document.querySelector(".done"); */
let buttonFilter = document.querySelector(".button-filter");
buttonFilter.addEventListener("click", () => {
  let calendarContainer = document.querySelector(".calendar-container");
  calendarContainer.style.display = calendarContainer.style.display === "none" ? "block" : "none";
  const buttonRect = buttonFilter.getBoundingClientRect();
  calendarContainer.style.left = buttonRect.left + "px"; // Position horizontale du bouton
  calendarContainer.style.top = buttonRect.bottom + "px"; // Position verticale juste en dessous bouton
});

let editor = document.querySelector(".adder-task");

let editorButton = editor.firstElementChild;

// Function pour delete une task
function deleteTask(taskDiv) {
  taskDiv.remove();
  saveTasks(getTasksFromUI());
}

// Fonction pour ajouter une tâche après initialisation
export function addTask(name, state, date, subTasks = []) {
  if (!name || !name.trim()) {
    editorButton.style.display = "block";
    return; // Ignore empty or whitespace-only task names
  }

  let taskElement = document.createElement("div");
  taskElement.className = "task";

  let taskProperties = document.createElement("div");
  taskProperties.className = "task-properties";

  taskElement.appendChild(taskProperties);

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
    saveTasks(taskList);
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
      let taskNameInput = createInputTask();

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
          saveTasks(taskList);
        }
      });
    } else {
      let taskNameInput = document.querySelector(".task-input");
      // Save changes and restore original text
      taskTitle.textContent = taskNameInput.value;
      taskProperties.replaceChild(taskTitle, taskNameInput);
      editButton.textContent = "Edit Task";
      // Sauvegarder la liste mise à jour dans le stockage local

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
        saveTasks(taskList);
      }
    });
  }

  taskSettings.appendChild(editButton);


  editorButton.style.display = "block";
  // Sauvegarder la liste mise à jour dans le stockage local
  let taskList = getTasksFromUI();
  let taskIndex = taskList.findIndex(t => t.name === name);

  if (taskIndex !== -1) {
    // Tâche existante: Mettre à jour sans écraser les sous-tâches existantes si aucune nouvelle sous-tâche n'est fournie
    let existingSubTasks = taskList[taskIndex].subTasks || [];
    taskList[taskIndex] = { name, state, date, subTasks: subTasks.length > 0 ? subTasks : existingSubTasks };
  } else {
    // Nouvelle tâche: Ajouter la tâche avec les sous-tâches fournies
    taskList.push({ name, state, date, subTasks });
  }


  // Sauvegardez la liste mise à jour des tâches (par exemple, dans localStorage)
  saveTasks(taskList);

}

export function addSubtask(created = false, parentTaskName, taskName, choosedDate) {
  let popupWindow = document.querySelector(".popup-window");
  let subTaskAdder = document.querySelector(".sub-adder-task");
  let subTaskElement = document.createElement("div");
  subTaskElement.className = "sub-task";

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
}

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
      tasks.push({ name, state, date });
    }
  });
  return tasks;
}


// Fonction pour initialiser une tâche
function toggleTaskCreationForm() {
  editorButton.style.display =
    editorButton.style.display === "none" ? "block" : "none";
  const taskForm = editor.querySelector(".task") || createTaskForm();
  editor.appendChild(taskForm);
}

// Chargement des tâches lors du chargement de la page
window.addEventListener("load", loadTasks);

editorButton.addEventListener("click", toggleTaskCreationForm);
