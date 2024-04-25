
export let calendar;

document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');
  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'timeGridWeek',
    height: 'auto', // Ajuste automatiquement la hauteur pour éviter le débordement
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay listMonth'
    },
    events: [
      {
        title: 'All Day Event',
        start: '2024-03-01'
      },

    ]
  });
  calendar.render();



});