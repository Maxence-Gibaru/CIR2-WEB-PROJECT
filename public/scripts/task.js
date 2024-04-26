import { loadTasks, saveTasks, removeTask, doneTask } from "./data.js";
import {
  createButton,
  createInputTask,
  createTaskForm,
  createTaskPanel,
} from "./dom-content/elementCreator.js";

// DOM elements
let editor = document.querySelector(".adder-task");
export let editorButton = editor.firstElementChild;

// Task class definition
export class Task {
  constructor(name, state, date, subTasks, id, isSubTask = false) {
    this.id = id;
    this.name = name;
    this.state = state;
    this.date = date;
    this.subTasks = subTasks;
    this.isSubTask = isSubTask;
  }

  // Method to create a task node
  createTaskNode(parentNode, myEditor) {
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
    taskDate.textContent = this.date;
    taskDate.className = "task-date";
    taskProperties.appendChild(taskDate);

    let taskSettings = document.createElement("div");
    taskSettings.className = "task-settings";
    taskNode.appendChild(taskSettings);

    const checkTask = createButton("task-check", "", () => {
      this.checkTask(taskNode);
    });
    taskProperties.insertBefore(checkTask, taskTitle);

    const editButton = createButton("task-button-edit", "Edit Task", () => {
      if (editButton.textContent === "Edit Task") {
        let taskNameInput = createInputTask();
        taskNameInput.value = taskTitle.textContent;
        taskProperties.replaceChild(taskNameInput, taskTitle);
        editButton.textContent = "Save";
        taskNameInput.addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            taskTitle.textContent = taskNameInput.value;
            taskProperties.replaceChild(taskTitle, taskNameInput);
            this.name = taskTitle.textContent;
            editButton.textContent = "Edit Task";
            saveTasks(this);
          }
        });
      } else {
        let taskNameInput = document.querySelector(".task-input");
        taskTitle.textContent = taskNameInput.value;
        taskProperties.replaceChild(taskTitle, taskNameInput);
        this.name = taskTitle.textContent;
        editButton.textContent = "Edit Task";
        saveTasks(this);
      }
    });
    taskSettings.appendChild(editButton);

    const deleteButton = createButton("task-button", "Delete", () => {
      this.deleteTask(taskNode);
    });
    taskSettings.appendChild(deleteButton);

    taskTitle.addEventListener("click", () => {
      createTaskPanel(this, taskNode);
    });

    myEditor.style.display = "block";

    parentNode.appendChild(taskNode);

    saveTasks(this);
  }

  // Method to mark a task as done
  checkTask(taskNode) {
    this.state = "done";
    taskNode.remove();
    doneTask(this);
  }

  // Method to delete a task
  deleteTask(taskNode) {
    taskNode.remove();
    removeTask(this);
  }
}

// Function to toggle the visibility of the task creation form
function toggleTaskCreationForm() {
  editorButton.style.display =
    editorButton.style.display === "none" ? "block" : "none";
  const taskForm = editor.querySelector(".task") || createTaskForm();
  editor.appendChild(taskForm);
}

// Load tasks when the page loads
window.addEventListener("load", loadTasks);

// Event listener for the task creation button
editorButton.addEventListener("click", toggleTaskCreationForm);
