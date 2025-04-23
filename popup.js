// popup.js

document.addEventListener("DOMContentLoaded", function () {
  // Open popup when element with data-popup-target is clicked
  document.querySelectorAll('[data-popup-target]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const popupId = trigger.getAttribute('data-popup-target');
      const popup = document.getElementById(popupId);
      if (popup) {
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Lock background scroll
      }
    });
  });

  // Close popup on close button
  document.querySelectorAll('.close-button').forEach(button => {
    button.addEventListener('click', () => {
      const popup = button.closest('.popup-container');
      if (popup) {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scroll
      }
    });
  });

  // Close popup by clicking outside of the popup content
  document.querySelectorAll('.popup-container').forEach(popup => {
    popup.addEventListener('click', (event) => {
      if (event.target === popup) {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  });
});