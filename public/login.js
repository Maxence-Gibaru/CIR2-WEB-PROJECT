document.addEventListener("DOMContentLoaded", function() {
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
            // pop up vert pour dire que la connexion a réussi
            const popup = document.getElementById("popup");
            popup.textContent = "Connexion réussie !";
            popup.style.backgroundColor = "#00ff00";
            popup.style.display = "block";
            setTimeout(() => {
                popup.style.display = "none";
                window.location.href = data.redirectTo; 
            }, 5000);
            
        } else {
            const popup = document.getElementById("popup");
            popup.textContent = "Mot de passe incorrect. Veuillez réessayer.";
            popup.style.backgroundColor = "#ee0f0f";
            popup.style.display = "block";
            
            setTimeout(() => {
                popup.style.display = "none";
            }, 1500);
        }
    })
    .catch((error) => {
        console.error("Error logging in:", error);
    });
});
    // Vérifier si l'utilisateur est déjà connecté au chargement de la page
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
    const navigate = function() {
      window.location.href = "/signup.html"; // Redirige l'utilisateur vers la page de signup
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
  

  