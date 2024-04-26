document.addEventListener("DOMContentLoaded", function() {
  // Function to navigate to the home page
  const navigate = function() {
    window.location.href = "/";
  };

  // Event listener for the login link
  document.getElementById("login-link").addEventListener("click", navigate);

  // Event listener for the signup form submission
  document.getElementById("signup-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Display success message if signup is successful
        const popup = document.getElementById("popup");
        popup.textContent = "Signup successful!";
        popup.style.backgroundColor = "#00ff00";
        popup.style.display = "block";
        // Redirect to login page after 5 seconds
        setTimeout(() => {
          popup.style.display = "none";
          window.location.href = "/login.html"; 
        }, 5000);
      } else {
        // Display error message if signup fails
        const popup = document.getElementById("popup");
        popup.textContent = "Signup failed. Please try again.";
        popup.style.backgroundColor = "#ee0f0f";
        popup.style.display = "block";
        // Hide after 1.5 seconds
        setTimeout(() => {
          popup.style.display = "none";
        }, 1500);
      }
    } catch (error) {
      // Display error message if an error occurs during signup
      const popup = document.getElementById("popup");
      popup.textContent = "Signup failed. Please try again.";
      popup.style.backgroundColor = "#ee0f0f";
      popup.style.display = "block";
      // Hide after 1.5 seconds
      setTimeout(() => {
        popup.style.display = "none";
      }, 1500);
    }
  });
});
