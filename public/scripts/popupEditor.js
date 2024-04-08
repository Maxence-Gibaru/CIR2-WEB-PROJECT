const bodyElement = document.body;

export function createPopupWindow() {
  let backgroundOverlay = document.createElement("div");
  backgroundOverlay.className = "background-overlay";
  let popupWindow = document.createElement("div");
  popupWindow.className = "popup-window";
  bodyElement.appendChild(backgroundOverlay);
  bodyElement.appendChild(popupWindow);
}


