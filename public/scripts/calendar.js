let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

// DOM elements
const day = document.querySelector(".calendar-dates");
const currdate = document.querySelector(".calendar-current-date");
const prenexIcons = document.querySelectorAll(".calendar-navigation span");

// Array of month names
export const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Function to manipulate calendar dates
const manipulate = () => {
  let dayone = new Date(year, month, 1).getDay();
  let lastdate = new Date(year, month + 1, 0).getDate();
  let dayend = new Date(year, month, lastdate).getDay();
  let monthlastdate = new Date(year, month, 0).getDate();

  let lit = "";
  // Previous month dates
  for (let i = dayone; i > 0; i--) {
    lit += `<li class="inactive">${monthlastdate - i + 1}</li>`;
  }
  // Current month dates
  for (let i = 1; i <= lastdate; i++) {
    let isToday = (i === date.getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) ? "active" : "";
    lit += `<li class="${isToday}">${i}</li>`;
  }
  // Next month dates
  for (let i = dayend; i < 6; i++) {
    lit += `<li class="inactive">${i - dayend + 1}</li>`;
  }

  // Update current date display
  currdate.innerText = `${months[month]} ${year}`;

  // Update calendar dates
  day.innerHTML = lit;

  // Add event listeners to each day
  let days = day.querySelectorAll("li");
  days.forEach((myDay) => {
    myDay.addEventListener("click", () => {
      var selectedDate = [myDay.innerHTML, months[month], year];
      myDay.className = "selected";
    });
  });
};

// Initial rendering
manipulate();

// Event listeners for navigation icons
prenexIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    month = icon.id === "calendar-prev" ? month - 1 : month + 1;

    // Check if the month is out of range
    if (month < 0 || month > 11) {
      date = new Date(year, month, new Date().getDate());
      year = date.getFullYear();
      month = date.getMonth();
    } else {
      date = new Date();
    }

    // Re-render calendar
    manipulate();
  });
});
