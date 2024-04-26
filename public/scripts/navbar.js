// Select all links in the navigation bar
const navLinks = document.querySelectorAll(".sidebar a");

// Iterate over each link in the navigation bar
navLinks.forEach((link) => {
  // Add a click event handler to each link
  link.addEventListener("click", (event) => {
    // Prevent the default behavior of the link (navigating to a new page)
    event.preventDefault();

    // Get the ID of the section to display from the link's href attribute
    const targetId = link.getAttribute("href").substring(1);

    // Hide all content sections
    const allSections = document.querySelectorAll(".widget-container section");
    allSections.forEach((section) => {
      section.style.display = "none";
    });

    // Display specific content sections based on the clicked link
    if (targetId != "dashboard") {
      allSections.forEach((section) => {
        section.style.display = "none";
      });
    } else {
      allSections.forEach((section) => {
        if (section.id == "account") {
          section.style.display = "none";
        }
        if (section.id != "account") {
          section.style.display = "block";
        }
      });
    }

    // Display the content section corresponding to the selected tab
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.style.display = "block";
    }
  });
});
