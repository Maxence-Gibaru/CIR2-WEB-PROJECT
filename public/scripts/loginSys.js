fetch('/api/session')
    .then(response => {
      if (response.redirected) {
        window.location.href = response.url;
      } else {
        return response.json();
      }
    })
    .then(data => {
      document.getElementById("content").classList.remove("hidden");
      console.log("User information:", data.user);
    })
    .catch(error => {
      console.error('Error checking session:', error);
    });


document.getElementById("logout-button").addEventListener("click", function () {
    fetch("http://localhost:3000/api/logout", {
        method: "GET",
        credentials: "include",
    })
        .then((response) => response.json())
        .then(data => {
        window.location.href = "http://localhost:3000/login.html";
        })
        .catch((error) => {
        console.error("Error logging out:", error);
        });
    });