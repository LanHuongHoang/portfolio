// === Popup Trigger Logic ===
document.querySelectorAll('[data-popup-target]').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const popupId = trigger.getAttribute('data-popup-target');
    
    // Hide all popups first
    document.querySelectorAll('.popup-container').forEach(popup => {
      popup.style.display = 'none';
    });

    // Show only the targeted popup
    const targetPopup = document.getElementById(popupId);
    if (targetPopup) {
      targetPopup.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  });
});

// === Close Button Logic ===
document.querySelectorAll('.close-button').forEach(button => {
  button.addEventListener('click', (event) => {
    const popup = event.target.closest('.popup-container');
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
});

// === Click Outside to Close ===
window.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup-container')) {
    event.target.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// === Tab and Slideshow Sync Logic ===
let currentSlideIndex = 0;

const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const tabSlideshows = document.querySelectorAll('.tab-slideshow');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const target = button.dataset.tab;

    // Activate the current tab
    tabButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Show correct text content
    tabContents.forEach(content => {
      content.classList.toggle('active', content.id === target);
    });

    // Show correct slideshow
    tabSlideshows.forEach(show => {
      show.classList.toggle('active', show.id === `slideshow-${target}`);
    });

    currentSlideIndex = 0;
    updateActiveSlide();
  });
});

// === Update Slide by Index ===
function updateActiveSlide() {
  const activeSlideshow = document.querySelector('.tab-slideshow.active');
  if (!activeSlideshow) return;
  const slides = activeSlideshow.querySelectorAll('.slide-img');

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentSlideIndex);
  });
}

// === Manual Prev/Next Navigation ===
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
