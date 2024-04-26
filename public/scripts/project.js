import { createPopupWindow } from "./dom-content/popupEditor.js";

// DOM elements
const bodyElement = document.body;
const buttonAdd = document.querySelector(".project-add");

// Function to save projects to localStorage
function saveProject(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}

// Function to display the panel for adding a project
function showPanel() {
  let newPopup = createPopupWindow();
  bodyElement.appendChild(newPopup);
}

// Function to add a new project
function addProject() {
  let projectName = document.querySelector(".project-name").value;
  if (!projectName) return; // Check if the project name is empty

  // Load projects from localStorage
  let projects = JSON.parse(localStorage.getItem("projects")) || [];

  // Check if projects is an array
  if (!Array.isArray(projects)) {
    projects = []; // If it's not an array, initialize it as an empty array
  }

  // Add the new project to the projects list
  projects.push(projectName);

  // Save the updated list to localStorage
  saveProject(projects);

  // Display the newly added project
  displayProject(projectName);

  // Hide the panel and the overlay
  hidePanel();
}

// Function to display a project
function displayProject(projectName) {
  let projectContainer = document.querySelector(".project-container");
  let newProjectElement = document.createElement("div");
  newProjectElement.textContent = projectName;
  projectContainer.appendChild(newProjectElement);
}

// Function to hide the panel and overlay
function hidePanel() {
  let projectPanel = document.querySelector(".project-panel");
  let backgroundOverlay = document.querySelector(".background-overlay");
  let projectNameInput = document.querySelector(".project-name");
  projectNameInput.value = ""; // Clear the project name input field
  projectPanel.style.visibility = "hidden";
  backgroundOverlay.style.display = "none";
}

// Function to load projects from localStorage and display them
function loadProjects() {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  projects.forEach((project) => {
    displayProject(project);
  });
}

// Event listener for the "Add" button to show the panel for adding a project
buttonAdd.addEventListener("click", showPanel);
