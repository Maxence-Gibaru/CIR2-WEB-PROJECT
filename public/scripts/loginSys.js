// Function to check session status and redirect if necessary
function checkSession() {
  fetch("/api/session")
    .then((response) => {
      // Check if response was redirected
      if (response.redirected) {
        // Redirect to the URL specified in the response
        window.location.href = response.url;
      } else {
        // Continue processing the response
        return response.json();
      }
    })
    .then((data) => {
      // Remove the 'hidden' class from the content element to show it
      document.getElementById("content").classList.remove("hidden");
    })
    .catch((error) => {
      // Log any errors that occur during the process
      console.error("Error checking session:", error);
    });
}

// Execute the checkSession function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
  checkSession();
});
