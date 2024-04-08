import { createPopupWindow } from "./popupEditor.js";

let bodyElement = document.body;

const buttonAdd = document.querySelector(".project-add");

function saveProject(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}

function showPanel() {
  let newPopup = createPopupWindow();
  bodyElement.appendChild(newPopup);
}

function addProject() {
  let projectName = document.querySelector(".project-name").value;
  if (!projectName) return; // Vérifiez si le nom du projet est vide

  // Charger les projets depuis le stockage local
  let projects = JSON.parse(localStorage.getItem("projects")) || [];

  // Vérifier si projects est un tableau
  if (!Array.isArray(projects)) {
    projects = []; // Si ce n'est pas un tableau, initialisez-le comme un tableau vide
  }

  // Ajouter le nouveau projet à la liste des projets
  projects.push(projectName);

  // Enregistrer la liste mise à jour dans localStorage
  saveProject(projects);

  // Afficher le projet nouvellement ajouté
  displayProject(projectName);

  // Masquer le panneau et l'overlay
  hidePanel(projectName);
}

function displayProject(projectName) {
  let projectContainer = document.querySelector(".project-container");
  let newProjectElement = document.createElement("div");
  newProjectElement.textContent = projectName;
  projectContainer.appendChild(newProjectElement);
}

function hidePanel(projectName) {
  let projectPanel = document.querySelector(".project-panel");
  let backgroundOverlay = document.querySelector(".background-overlay");
  projectName.value = "";
  projectPanel.style.visibility = "hidden";
  backgroundOverlay.style.display = "none";
}

function loadProjects() {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  projects.forEach((project) => {
    displayProject(project);
  });
}

buttonAdd.addEventListener("click", showPanel);
