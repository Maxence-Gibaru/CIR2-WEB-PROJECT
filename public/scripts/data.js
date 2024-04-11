export function saveTasks(newTask) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Vérifiez si 'tasks' est vraiment un tableau
  console.log(Array.isArray(tasks)); // Doit être 'true'

  // Continuez seulement si 'tasks' est un tableau
  if (Array.isArray(tasks)) {
    const existingTaskIndex = tasks.findIndex(task => task.name === newTask.name);

    if (existingTaskIndex !== -1) {
      tasks[existingTaskIndex] = newTask;
    } else {
      tasks.push(newTask);
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
  } else {
    console.error("Expected 'tasks' to be an array but received:", tasks);
  }
}

// Fonction pour charger les tâches à partir du stockage local
export function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  console.log(tasks);
}
