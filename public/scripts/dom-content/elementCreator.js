import { Task, editorButton } from "../task.js";
import { createPopupWindow, createSubTaskEditor } from "./popupEditor.js";
import { hashCode } from "../utils.js";

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
  subTask.createTaskNode(popupWindow, editorButton);
}

// Fonction pour créer les éléments d'une tâches
export function createTaskForm(parentTask = null, isSubtask = false) {
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
        if (parentTask) {
          let wrapperTask = document
            .querySelector(".popup-window")
            .querySelector(".wrapper-task");
          let newSubTask = new Task(
            taskName,
            "in-progress",
            choosedDate,
            [],
            hashCode(`${taskName}-${Date.now()}`).toString(),
            true
          );

          parentTask.subTasks.push(newSubTask);

          newSubTask.createTaskNode(
            wrapperTask,
            document.querySelector(".popup-window").querySelector(".adder-task"),
            true
          );
        }

      } else {
        // Ajoutez une tâche principale comme avant
        let wrapperTask = document.querySelector(".wrapper-task");
        let newTask = new Task(
          taskName,
          "in-progress",
          choosedDate,
          [],
          hashCode(`${taskName}-${Date.now()}`).toString()
        );
        newTask.createTaskNode(wrapperTask, editorButton);
        /* console.log(JSON.stringify(newTask)) */
      }
      taskElement.remove();
    }
  });

  const deadLineDate = createButton("date-picker", "Date", () => {
    let calendarContainer = document.querySelector(".calendar-container");
    calendarContainer.style.display =
      calendarContainer.style.display === "none" ? "block" : "none";
    const buttonRect = deadLineDate.getBoundingClientRect();
    calendarContainer.style.left = buttonRect.left + "px"; // Position horizontale du bouton
    calendarContainer.style.top = buttonRect.bottom + "px"; // Position verticale juste en dessous bouton

    let days = calendarContainer.querySelectorAll(".calendar-dates li");

    days.forEach((d) => {
      d.addEventListener("click", () => {
        // Trouver l'ancien jour sélectionné et le désactiver
        let previousSelected = calendarContainer.querySelector(
          ".calendar-dates .selected"
        );
        if (previousSelected) {
          previousSelected.classList.remove("selected");
        }

        // Marquer le nouveau jour comme sélectionné
        d.classList.add("selected");

        // Mettre à jour la date choisie et l'afficher
        choosedDate = d.textContent;
        deadLineDate.textContent = choosedDate;

        calendarContainer.style.display = "none";
      });
    });
  });
  taskElement.appendChild(deadLineDate);

  const cancelButton = createButton("task-button", "Cancel", () => {
    editorButton.style.display = "block";
    taskElement.remove();
    return;
  });
  taskElement.appendChild(cancelButton);

  const submitButton = createButton("task-button", "Add a task", () => {
    const taskName = inputTaskName.value;
    if (isSubtask) {
      // Ici, ajoutez la sous-tâche à la tâche principale spécifiée
      let wrapperTask = document
        .querySelector(".popup-window")
        .querySelector(".wrapper-task");
      let newTask = new Task(
        taskName,
        "in-progress",
        choosedDate,
        [],
        hashCode(`${taskName}-${Date.now()}`).toString()
      );
      newTask.createTaskNode(
        wrapperTask,
        document.querySelector(".popup-window").querySelector(".adder-task")
      );
    } else {
      let wrapperTask = document.querySelector(".wrapper-task");
      let newTask = new Task(
        taskName,
        "in-progress",
        choosedDate,
        [],
        hashCode(`${taskName}-${Date.now()}`).toString()
      );
      newTask.createTaskNode(wrapperTask, editorButton);
    }
    taskElement.remove();
  });

  taskElement.appendChild(submitButton);

  return taskElement;
}

export function createTaskPanel(taskObject, taskNode) {
  let popupWindow = createPopupWindow();

  let taskName = taskNode.querySelector(".task-title").textContent;
  createSubTaskEditor(taskName, popupWindow);
  document.body.appendChild(popupWindow);

  taskObject.subTasks.forEach((t) => { addSubtaskToUI(t, popupWindow) });

  let subTaskButtonContainer = document.createElement("div");
  subTaskButtonContainer.className = "sub-button-container";
  let adderSubTask = createButton("adder-task", "Add a subtask", () => {
    adderSubTask.style.display = "none";
    let subTaskForm = createTaskForm(taskObject, true);
    popupWindow.insertBefore(subTaskForm, popupWindow.querySelector(".wrapper-task"));
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
