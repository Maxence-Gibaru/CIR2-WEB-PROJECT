let buttonAdd = document.querySelector(".project-add");

function saveProject() {}

function loadProjects() {}

function showPanel() {
  let projectPanel = document.querySelector(".project-panel");
  let backgroundOverlay = document.querySelector(".background-overlay");
  backgroundOverlay.style.display = "block";
  projectPanel.style.visibility = "visible";
  // Blur and darker background
}

function addProject() {
  let projectName = document.querySelector(".project-name");
  let projectContainer = document.querySelector(".project-container");

  let myNewProject = document.createElement("div");
  myNewProject.textContent = projectName.value;
  projectContainer.appendChild(myNewProject);

  let projectWrapper = document.querySelector(".project-wrapper");
  projectWrapper.appendChild(myNewProject);

  let backgroundOverlay = document.querySelector(".background-overlay");
  backgroundOverlay.style.display = "none";

  let projectPanel = document.querySelector(".project-panel"); // Sélectionnez l'élément .project-panel
  projectName.value = "";
  projectPanel.style.visibility = "hidden";
}

buttonAdd.addEventListener("click", showPanel);

let buttonCancel = document.querySelector(".project-cancel");
buttonCancel.addEventListener("click", () => {
  let projectPanel = document.querySelector(".project-panel"); // Sélectionnez l'élément .project-panel
  projectPanel.style.visibility = "hidden";
  let backgroundOverlay = document.querySelector(".background-overlay");
  backgroundOverlay.style.display = "none";
});

let buttonSubmit = document.querySelector(".project-submit");
buttonSubmit.addEventListener("click", addProject);
