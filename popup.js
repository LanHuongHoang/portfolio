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
  // Tab switch logic
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.dataset.tab;

      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      tabContents.forEach(content => {
        content.classList.toggle('active', content.id === target);
      });
    });
  });

  // Slideshow logic
  const slides = document.querySelectorAll('.slide-img');
  let currentSlide = 0;

  document.querySelector('.next-slide').onclick = () => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  };

  document.querySelector('.prev-slide').onclick = () => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
  };

  