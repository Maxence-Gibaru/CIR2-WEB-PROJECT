const bodyElement = document.body;

export function createPopupWindow() {
  let backgroundOverlay = document.createElement("div");
  backgroundOverlay.className = "background-overlay";
  backgroundOverlay.addEventListener("click", () => {
    backgroundOverlay.style.display = "none";
    popupWindow.remove();
  });

  document.body.appendChild(backgroundOverlay);

  let popupWindow = document.createElement("div");
  popupWindow.className = "popup-window";

  return popupWindow;
}

export function createSubTaskEditor(name, popupWindow) {
  let taskName = document.createElement("h1");
  taskName.className = "popup-title";
  taskName.textContent = name;

  popupWindow.appendChild(taskName);
}
