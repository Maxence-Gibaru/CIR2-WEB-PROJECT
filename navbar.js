// Sélectionnez tous les liens de la barre de navigation
const navLinks = document.querySelectorAll(".sidebar a");

// Parcourez chaque lien de la barre de navigation
navLinks.forEach((link) => {
  // Ajoutez un gestionnaire d'événements de clic à chaque lien
  link.addEventListener("click", (event) => {
    // Empêchez le comportement par défaut du lien (naviguer vers une nouvelle page)
    event.preventDefault();

    // Obtenez l'identifiant de la section à afficher à partir de l'attribut href du lien
    const targetId = link.getAttribute("href").substring(1);

    // Masquez toutes les sections de contenu
    const allSections = document.querySelectorAll(".widget-container section");

    if (targetId != "dashboard") {
      allSections.forEach((section) => {
        section.style.display = "none";
      });
    } else {
      allSections.forEach((section) => {
        section.style.display = "block";
      });
    }

    // Affichez la section de contenu correspondant à l'onglet sélectionné
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.style.display = "block";
    }
  });
});
