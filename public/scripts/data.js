import { Task, editorButton } from "./task.js";
import { calendar } from "./calendar-ui.js";

// Function to save tasks to local storage
export function saveTasks(newTask) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  let taskIndex = tasks.findIndex((t) => t.id === newTask.id);

  if (taskIndex !== -1) {
    tasks[taskIndex] = newTask;
  } else {
    tasks.push(newTask);
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
export function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    let taskObject = new Task(
      task.name,
      task.state,
      task.date,
      task.subTasks,
      task.id,
      task.isSubTask
    );




    var wrapperTask = document.querySelector(".wrapper-task");

    if (!taskObject.isSubTask) {
      taskObject.createTaskNode(wrapperTask, editorButton);

      calendar.addEvent({
        title: task.name,
        start: task.date,
        allDay: true
      })
    }
  });
}

// Function to remove a task from local storage
export function removeTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  var newTasks = tasks.filter((t) => t.id !== task.id);

  localStorage.setItem("tasks", JSON.stringify(newTasks));
}

export function doneTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  var newTasks = tasks.filter((t) => t.id != task.id);

  localStorage.setItem("tasks", JSON.stringify(newTasks));
  let counterTask = document.querySelector(".task-counter");



  let myNewCounter = parseInt(counterTask.textContent) + 1;;
  counterTask.textContent = myNewCounter;
  localStorage.setItem("counter", parseInt(counterTask.textContent));

}

window.addEventListener("DOMContentLoaded", () => {
  console.log("xoxo");
  let counterTask = document.querySelector(".task-counter");
  counterTask.textContent = localStorage.getItem("counter");
})
