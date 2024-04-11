
import { loadTasks, saveTasks } from "./data.js";
import { addSubtaskToUI, createButton, createInputTask, createTaskForm, createTaskPanel } from "./dom-content/elementCreator.js";

let editor = document.querySelector(".adder-task");
export let editorButton = editor.firstElementChild;

export class Task {
  constructor(name, state, date, subTasks) {
    this.name = name;
    this.state = state;
    this.date = date != " " ? "Today" : this.date;
    this.subTasks = subTasks;
  }

  getTaskArray() {
    return [this.name, this.state, this.date, this.subTasks];
  }

  createTaskNode(parentNode, myEditor, isSubtask = false) {

    // Element definition

    if (this.name === "") {
      myEditor.style.display = "block";
      return;

    }

    let taskNode = document.createElement("div");
    taskNode.className = "task";

    let taskProperties = document.createElement("div");
    taskProperties.className = "task-properties";
    taskNode.appendChild(taskProperties);

    let taskTitle = document.createElement("div");
    taskTitle.className = "task-title";
    taskTitle.textContent = this.name;
    taskProperties.appendChild(taskTitle);

    let taskDate = document.createElement("div");

    taskDate.textContent = this.date != " " ? "Today" : this.date;
    taskDate.className = "task-date";
    taskProperties.appendChild(taskDate);

    let taskSettings = document.createElement("div");
    taskSettings.className = "task-settings";
    taskNode.appendChild(taskSettings);

    const checkTask = createButton("task-check", "", () => {
      this.checkTask(taskNode)
    })
    taskProperties.insertBefore(checkTask, taskTitle);

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
          taskNode.replaceChild(taskTitle, taskNameInput);
          editButton.textContent = "Edit Task";
          // Sauvegarder la liste mise à jour dans le stockage local
          saveTasks(taskList);
        }
      });
    }
    taskSettings.appendChild(editButton);


    const deleteButton = createButton("task-button", "Delete", () => {
      this.deleteTask(taskNode)
    });
    taskSettings.appendChild(deleteButton);
    /* Event Listeners */

    taskTitle.addEventListener("click", () => {
      createTaskPanel(taskNode);
    });

    myEditor.style.display = "block";

    parentNode.appendChild(taskNode);

    saveTasks([this])
  }

  checkTask(taskNode) {
    taskNode.remove();
  }

  // Function pour delete une task
  deleteTask(taskNode) {
    taskNode.remove()
  }


}

function handleDate() {
  let buttonFilter = createButton("button-filter", "Today", () => {
    let calendarContainer = document.querySelector(".calendar-container");
    calendarContainer.style.display = calendarContainer.style.display === "none" ? "block" : "none";
    const buttonRect = buttonFilter.getBoundingClientRect();
    calendarContainer.style.left = buttonRect.left + "px"; // Position horizontale du bouton
    calendarContainer.style.top = buttonRect.bottom + "px"; // Position verticale juste en dessous bouton
  });
  buttonFilter.classList.add = "reset";
  document.querySelector(".task-filter").appendChild(buttonFilter);
}

handleDate();


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
