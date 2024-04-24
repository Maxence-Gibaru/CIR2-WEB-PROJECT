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
          const popup = document.getElementById("popup");
            popup.textContent = "Connexion réussie !";
            popup.style.backgroundColor = "#00ff00";
            popup.style.display = "block";
            setTimeout(() => {
                popup.style.display = "none";
                window.location.href = data.redirectTo; 
            }, 5000);
            window.location.href = "/login.html";
        } else {
          const popup = document.getElementById("popup");
            popup.textContent = "Inscription échouée. Veuillez réessayer.";
            popup.style.backgroundColor = "#ee0f0f";
            popup.style.display = "block";
            
            setTimeout(() => {
                popup.style.display = "none";
            }, 1500);
        }
      } catch (error) {
        const popup = document.getElementById("popup");
            popup.textContent = "Inscription échouée. Veuillez réessayer.";
            popup.style.backgroundColor = "#ee0f0f";
            popup.style.display = "block";
            
            setTimeout(() => {
                popup.style.display = "none";
            }, 1500);
      }
    });
  });
  