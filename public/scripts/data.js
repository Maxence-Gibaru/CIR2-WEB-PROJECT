import { addTask, addSubtask } from "./task.js"

// Fonction pour sauvegarder les tâches dans le stockage local
export function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Fonction pour charger les tâches à partir du stockage local
export function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTask(task.name, task.state, task.date, task.subTasks)); // Ajouter chaque tâche chargée à la liste
}
