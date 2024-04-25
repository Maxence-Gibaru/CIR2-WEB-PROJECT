import { Task, editorButton } from "./task.js";
import { calendar } from "./calendar-ui.js";

export function saveTasks(newTask) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


  let taskIndex = tasks.findIndex((t) => t.id === newTask.id);

  if (taskIndex != -1) {
    tasks[taskIndex] = newTask;
  } else {
    tasks.push(newTask);
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}



// Fonction pour charger les tâches à partir du stockage local
export function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    let taskObject = new Task(
      task.name,
      task.state,
      task.date,
      task.subTasks,
      task.id
    );

    calendar.addEvent({
      title: task.name,
      start: task.date,
      allDay: true
    })


    var wrapperTask = document.querySelector(".wrapper-task");

    if (!taskObject.isSubTask) {
      taskObject.createTaskNode(wrapperTask, editorButton);
    }
  });
}

export function removeTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  var newTasks = tasks.filter((t) => t.id != task.id);

  localStorage.setItem("tasks", JSON.stringify(newTasks));
}
