const trigger = document.querySelector('.trigger');
const sidebar = document.querySelector('.sidebar');

// Functions
const sidebarToggle = () => {
  trigger.classList.toggle('active');
  sidebar.classList.toggle('show');
};

// Event Listeners
trigger.addEventListener('click', sidebarToggle);
