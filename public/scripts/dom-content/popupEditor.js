import { showMarkdownPreview } from "../utils.js"

const bodyElement = document.body;

function createOverlay() {
  let backgroundOverlay = document.createElement("div");
  backgroundOverlay.className = "background-overlay";

  document.body.appendChild(backgroundOverlay);

  return backgroundOverlay;
}

export function createPopupWindow() {
  let popupWindow = document.createElement("div");
  popupWindow.className = "popup-window";


  let backgroundOverlay = createOverlay();

  backgroundOverlay.addEventListener("click", () => {
    backgroundOverlay.remove();
    popupWindow.remove();
  });

  return popupWindow;
}

export function createSubTaskEditor(name, popupWindow) {
  let taskName = document.createElement("h1");
  taskName.className = "popup-title";
  taskName.textContent = name;

  let subTaskSettings = document.createElement("div");
  subTaskSettings.className = "popup-settings";

  // Créer un élément textarea pour la description de la tâche en Markdown
  let markdownDescription = document.createElement("textarea");
  markdownDescription.className = "popup-markdown-description";
  markdownDescription.placeholder = "Leave a note...";

  markdownDescription.addEventListener("input", () => {
    showMarkdownPreview(markdownDescription.value, popupWindow);
  }
  )


  popupWindow.appendChild(subTaskSettings);

  popupWindow.appendChild(taskName);
  popupWindow.appendChild(markdownDescription);
}
