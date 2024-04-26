document.addEventListener("DOMContentLoaded", function() {
  // Event listener for login form submission
  document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Fetch login API endpoint
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    })
    .then((response) => response.json())
    .then(data => {
      if (data.loggedIn) {
        // Display success message
        const popup = document.getElementById("popup");
        popup.textContent = "Login successful!";
        popup.style.backgroundColor = "#00ff00";
        popup.style.display = "block";
        // Redirect after 5 seconds
        setTimeout(() => {
          popup.style.display = "none";
          window.location.href = data.redirectTo; 
        }, 5000);
      } else {
        // Display error message
        const popup = document.getElementById("popup");
        popup.textContent = "Incorrect password. Please try again.";
        popup.style.backgroundColor = "#ee0f0f";
        popup.style.display = "block";
        // Hide after 1.5 seconds
        setTimeout(() => {
          popup.style.display = "none";
        }, 1500);
      }
    })
    .catch((error) => {
      console.error("Error logging in:", error);
    });
  });

  // Check session status on page load
  fetch("http://localhost:3000/api/session")
    .then((response) => response.json())
    .then(data => {
      if (data.loggedIn) {
        window.location.href = "../"; 
      }
    })
    .catch((error) => {
      console.error("Error checking session:", error);
    });

  // Function to navigate to signup page
  const navigate = function() {
    window.location.href = "/signup.html";
  };

  // Event listener for signup link click
  document.getElementById("signup-link").addEventListener("click", navigate);

  // Event listener for login form submission (duplicate)
  document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Fetch login API endpoint
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    })
    .then((response) => response.json())
    .then(data => {
      if (data.loggedIn) {
        window.location.href = data.redirectTo; 
      } else {
        console.log('Login failed:', data.message);
      }
    })
    .catch((error) => {
      console.error("Error logging in:", error);
    });
  });
});