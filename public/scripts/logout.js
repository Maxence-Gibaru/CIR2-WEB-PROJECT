document.getElementById("logout-button").addEventListener("click", function () {
    // Fetch logout API endpoint
    fetch("http://localhost:3000/api/logout", {
        method: "GET",
        credentials: "include",
    })
    .then((response) => response.json())
    .then(data => {
        // Redirect to login page after successful logout
        window.location.href = "http://localhost:3000/login.html";
    })
    .catch((error) => {
        console.error("Error logging out:", error);
    });
});
