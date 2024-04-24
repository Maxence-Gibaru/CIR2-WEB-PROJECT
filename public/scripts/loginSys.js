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