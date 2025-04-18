// popup.js

// Open popup
document.querySelectorAll('.slide img').forEach((img, index) => {
    img.addEventListener('click', () => {
      const popupId = `popup${index + 1}`;
      const popup = document.getElementById(popupId);
      if (popup) {
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scroll
      }
    });
  });
  
  // Close popup on close button
  document.querySelectorAll('.close-button').forEach(button => {
    button.addEventListener('click', (event) => {
      const popup = event.target.closest('.popup-container');
      popup.style.display = 'none';
      document.body.style.overflow = 'auto'; // Restore scroll
    });
  });
  
  // Close popup when clicking outside the content
  window.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup-container')) {
      event.target.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
  