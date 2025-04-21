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
  let currentSlideIndex = 0;

// TAB SWITCH LOGIC
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const tabSlideshows = document.querySelectorAll('.tab-slideshow');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const target = button.dataset.tab;

    tabButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    tabContents.forEach(content => {
      content.classList.toggle('active', content.id === target);
    });

    tabSlideshows.forEach(show => {
      show.classList.toggle('active', show.id === `slideshow-${target}`);
    });

    // Reset slideshow index
    currentSlideIndex = 0;
    updateActiveSlide();
  });
});

// SLIDE NAVIGATION LOGIC
function updateActiveSlide() {
  const activeSlideshow = document.querySelector('.tab-slideshow.active');
  const slides = activeSlideshow.querySelectorAll('.slide-img');

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentSlideIndex);
  });
}

document.querySelectorAll('.prev-slide').forEach(btn => {
  btn.addEventListener('click', () => {
    const activeSlideshow = btn.closest('.tab-slideshow.active');
    const slides = activeSlideshow.querySelectorAll('.slide-img');
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    updateActiveSlide();
  });
});

document.querySelectorAll('.next-slide').forEach(btn => {
  btn.addEventListener('click', () => {
    const activeSlideshow = btn.closest('.tab-slideshow.active');
    const slides = activeSlideshow.querySelectorAll('.slide-img');
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    updateActiveSlide();
  });
});
