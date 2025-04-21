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
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  const tabSlideshows = document.querySelectorAll('.tab-slideshow');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.dataset.tab;
  
      // Update tab button styles
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
  
      // Show relevant text
      tabContents.forEach(content => {
        content.classList.toggle('active', content.id === target);
      });
  
      // Show relevant slideshow
      tabSlideshows.forEach(show => {
        show.classList.toggle('active', show.id === `slideshow-${target}`);
      });
  
      // Reset slideshow images (optional)
      document.querySelectorAll('.slide-img').forEach(img => img.classList.remove('active'));
      const visibleSlide = document.querySelector(`#slideshow-${target} .slide-img`);
      if (visibleSlide) visibleSlide.classList.add('active');
    });
  });  