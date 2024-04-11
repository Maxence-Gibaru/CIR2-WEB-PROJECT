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

  popupWindow.appendChild(taskName);
}
