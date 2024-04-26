document.addEventListener("DOMContentLoaded", function() {
  const saveProfileButton = document.querySelector('#saveProfile');

  // Event listener for save profile button click
  saveProfileButton.addEventListener('click', function() {
    // Get input values
    const firstNameInputs = document.querySelectorAll('input[name="firstName"]');
    const lastNameInputs = document.querySelectorAll('input[name="lastName"]');
    const mobileNumberInputs = document.querySelectorAll('input[name="mobileNumber"]');
    const firstName = firstNameInputs[0].value;
    const lastName = lastNameInputs[0].value;
    const mobileNumber = mobileNumberInputs[0].value;
    const colorPick = document.querySelector('#colorPicker');

    // Fetch user session data
    fetch('/api/session')
      .then(response => response.json())
      .then(data => {
        const email = data.user.email;
        // Update user profile data
        fetch('/api/profiles/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            firstName: firstName,
            lastName: lastName,
            mobileNumber: mobileNumber,
            color: colorPick.value
          })
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log(data.message); 
        })
        .catch(error => {
          console.error('Error:', error);
        });
      })
      .catch(error => {
        console.error('Error checking session:', error);
      });
  });

  // Fetch user session data for profile retrieval
  fetch('/api/session')
    .then(response => response.json())
    .then(data => {
      const userEmail = data.user.email;
      // Fetch user profile data
      fetch(`/api/profiles/${userEmail}`)
        .then(response => response.json())
        .then(profile => {
          console.log('Profile:', profile);
          // Pre-fill form fields with profile data
          const firstNameInputs = document.querySelectorAll('input[name="firstName"]');
          const lastNameInputs = document.querySelectorAll('input[name="lastName"]');
          const mobileNumberInputs = document.querySelectorAll('input[name="mobileNumber"]');
          const colorPick = document.querySelector('#colorPicker');
          firstNameInputs[0].value = profile.firstName ? profile.firstName : '';
          lastNameInputs[0].value = profile.lastName ? profile.lastName : '';
          mobileNumberInputs[0].value = profile.mobileNumber ? profile.mobileNumber : '';
          colorPick.value = profile.colorPreference ? profile.colorPreference : '#000000';

          // Update main color property
          document.documentElement.style.setProperty('--main-color', profile.colorPreference ? profile.colorPreference : '#000000');
        })
        .catch(error => {
          console.error('Error fetching profile:', error);
        });
    })
    .catch(error => {
      console.error('Error checking session:', error);
    });
});