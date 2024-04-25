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
    /* let userDiv = document.querySelector(".user-info"); */
    let userMail = document.querySelector(".user-mail");
    let userName = document.querySelector(".user-name");
    userName.textContent = "User Name ?";
    /* let userPsw = document.querySelector(".user-psw"); */
    userMail.textContent = data.user.email;
    /* userPsw.textContent = data.user.password; */
    console.log("User information:", data.user);
  })
  .catch(error => {
    console.error('Error checking session:', error);
  });