document.addEventListener("DOMContentLoaded", function() {
    const navigate = function() {
      window.location.href = "/";
    };
  
    document.getElementById("login-link").addEventListener("click", navigate);
  
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
          console.log("Inscription réussie");
        } else {
          console.log("Échec de l'inscription");
        }
      } catch (error) {
        console.log("Une erreur s'est produite lors de l'inscription", error);
      }
    });
  });
  