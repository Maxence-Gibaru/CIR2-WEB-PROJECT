// Function to generate hash code for a string
export function hashCode(s) {
  let h;
  for (let i = 0; i < s.length; i++)
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}

// Event listener to set main color variable based on color picker input
document.addEventListener('DOMContentLoaded', (event) => {
  const colorPicker = document.getElementById('colorPicker');

  colorPicker.addEventListener('input', (event) => {
    const color = event.target.value;
    document.documentElement.style.setProperty('--main-color', color);
  });
});

// Function to show markdown preview in a popup window
export function showMarkdownPreview(markdownText, popupWindow) {
  // Convert markdown text to HTML
  let htmlContent = marked(markdownText);

  // Create a div for the preview
  let previewDiv = document.createElement('div');
  previewDiv.className = 'markdown-preview';
  previewDiv.innerHTML = htmlContent;

  // Append the preview div to the popup window
  popupWindow.appendChild(previewDiv);

  // Perform additional actions with previewDiv, such as adding it to the DOM
}
