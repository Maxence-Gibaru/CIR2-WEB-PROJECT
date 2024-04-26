export let calendar;

// Initialize calendar when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
  // Get the calendar element
  var calendarEl = document.getElementById('calendar');

  // Create a new FullCalendar instance
  calendar = new FullCalendar.Calendar(calendarEl, {
    // Set the initial view to timeGridWeek
    initialView: 'timeGridDay',
    // Automatically adjust height to avoid overflow
    height: 'auto',
    // Define the header toolbar configuration
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay listMonth'
    },
    // Define the events for the calendar
    events: [
      {
        title: 'All Day Event',
        start: '2024-03-01'
      }
    ]
  });

  // Render the calendar
  calendar.render();
});
