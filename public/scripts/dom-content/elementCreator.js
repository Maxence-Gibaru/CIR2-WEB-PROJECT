import { Task, editorButton } from "../task.js";
import { createPopupWindow, createSubTaskEditor } from "./popupEditor.js";

// Fonction pour créer un imput
export function createInputTask() {
  let input = document.createElement("input");
  input.className = "task-input";
  input.placeholder = "Name of task";
  return input;
}

// Fonction template pour créer n'importe quel bouton
export function createButton(className, textContent, clickHandler) {
  let button = document.createElement("button");
  button.className = className;
  button.textContent = textContent;
  button.addEventListener("click", clickHandler);
  return button;
}

// Cette fonction est un exemple de comment vous pourriez ajouter une sous-tâche à l'UI du popup
export function addSubtaskToUI(subTask, popupWindow) {
  let subTaskElement = document.createElement("div");
  subTaskElement.textContent = subTask.name; // Ajoutez plus de détails selon votre UI
  // Ajoutez ici plus de logique si nécessaire, par exemple des boutons pour modifier/supprimer la sous-tâche
  popupWindow.appendChild(subTaskElement);
}

// Fonction pour créer les éléments d'une tâches
export function createTaskForm(isSubtask = false, parentTaskName = null) {
  let choosedDate;

  const taskElement = document.createElement("div");
  taskElement.className = "task-form";

  const inputTaskName = createInputTask();
  taskElement.appendChild(inputTaskName);

  inputTaskName.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      const taskName = inputTaskName.value;
      if (isSubtask) {
        // Ici, ajoutez la sous-tâche à la tâche principale spécifiée
        let wrapperTask = document.querySelector(".popup-window").querySelector(".wrapper-task");
        let newTask = new Task(taskName, "in-progress", choosedDate, [])
        newTask.createTaskNode(wrapperTask, document.querySelector(".popup-window").querySelector(".adder-task"))
      } else {
        // Ajoutez une tâche principale comme avant
        let wrapperTask = document.querySelector(".wrapper-task")
        let newTask = new Task(taskName, "in-progress", choosedDate, []);
        newTask.createTaskNode(wrapperTask, editorButton);
        /* console.log(JSON.stringify(newTask)) */
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
      let wrapperTask = document.querySelector(".popup-window").querySelector(".wrapper-task");
      let newTask = new Task(taskName, "in-progress", choosedDate, [])
      newTask.createTaskNode(wrapperTask, document.querySelector(".popup-window").querySelector(".adder-task"))
    } else {

      let wrapperTask = document.querySelector(".wrapper-task")
      let newTask = new Task(taskName, "in-progress", choosedDate, []);
      newTask.createTaskNode(wrapperTask, editorButton);
    }
    taskElement.remove();
  });

  taskElement.appendChild(submitButton);

  return taskElement;
}

export function createTaskPanel(taskNode) {
  let popupWindow = createPopupWindow();

  let taskName = taskNode.querySelector(".task-title").textContent;
  createSubTaskEditor(taskName, popupWindow);
  document.body.appendChild(popupWindow);

  let subTaskButtonContainer = document.createElement("div");
  let adderSubTask = createButton("adder-task", "Add a subtask", () => {
    adderSubTask.style.display = "none";
    let subTaskForm = createTaskForm(true, taskNode);
    popupWindow.appendChild(subTaskForm);
  });

  /* const taskIndex = tasks.findIndex((task) => task.name === taskName);
  tasks[taskIndex].subTasks.forEach((subTask) => {
    addSubtask(true, taskName, subTask.name, subTask.date);
  }); */
  /* popupWindow.appendChild(taskElement); */
  popupWindow.appendChild(subTaskButtonContainer);
  subTaskButtonContainer.appendChild(adderSubTask);

  let wrapperTask = document.createElement("div");
  wrapperTask.className = "wrapper-task";

  popupWindow.appendChild(wrapperTask);

  // Récupérer et afficher les sous-tâches existantes

}