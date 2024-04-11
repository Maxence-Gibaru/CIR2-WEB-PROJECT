document.addEventListener("DOMContentLoaded", function() {
    const navigate = function() {
      window.location.href = "/Signup";
    };
  
    document.getElementById("signup-link").addEventListener("click", navigate);
  
    document.getElementById("login-form").addEventListener("submit", function(event) {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
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
            window.location.href = data.redirectTo; // Redirection de l'utilisateur
          } else {
            console.log('Login failed:', data.message);
          }
        })
        .catch((error) => {
          console.error("Error logging in:", error);
        });
    });
  });
  