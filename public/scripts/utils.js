export function hashCode(s) {
  let h;
  for (let i = 0; i < s.length; i++)
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}




document.addEventListener('DOMContentLoaded', (event) => {
  const colorPicker = document.getElementById('colorPicker');

  colorPicker.addEventListener('input', (event) => {
    const color = event.target.value;
    document.documentElement.style.setProperty('--main-color', color);
  });
});





export function showMarkdownPreview(markdownText, popupWindow) {
  let htmlContent = marked(markdownText);
  let previewDiv = document.createElement('div');
  previewDiv.className = 'markdown-preview';
  previewDiv.innerHTML = htmlContent;

  popupWindow.appendChild(previewDiv);

  // Faites quelque chose avec previewDiv, comme l'ajouter au DOM
}