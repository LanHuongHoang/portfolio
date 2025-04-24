// Handle popup opening
document.querySelectorAll('.popup-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const popupId = trigger.getAttribute('data-popup');
    const popup = document.getElementById(popupId);
    if (popup) {
      popup.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  });
});

// Close Popup
document.querySelectorAll('.close-button').forEach(button => {
  button.addEventListener('click', () => {
    button.closest('.popup-container').style.display = 'none';
    document.body.style.overflow = 'auto';
  });
});

// Close popup on outside click
window.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup-container')) {
    event.target.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Hover image swap functionality
document.querySelectorAll('.hover-image').forEach(img => {
  img.addEventListener('mouseenter', () => {
    img.src = img.getAttribute('data-hover-src');
  });
  img.addEventListener('mouseleave', () => {
    img.src = img.getAttribute('data-original-src');
  });
});

// Scoped popup tab and slideshow functionality
document.querySelectorAll('.popup-container').forEach(popup => {
  const tabButtons = popup.querySelectorAll('.tab-button');
  const tabContents = popup.querySelectorAll('.tab-content');
  const tabSlideshows = popup.querySelectorAll('.tab-slideshow');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.dataset.tab;

      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      tabContents.forEach(content => {
        content.classList.toggle('active', content.id === target);
      });

      tabSlideshows.forEach(slideshow => {
        slideshow.classList.toggle('active', slideshow.id === `slideshow-${target}`);
        resetSlideshow(slideshow);
      });
    });
  });

  function resetSlideshow(slideshow) {
    const slides = slideshow.querySelectorAll('.slide-img');
    slides.forEach((slide, i) => slide.classList.toggle('active', i === 0));
  }

  popup.querySelectorAll('.prev-slide').forEach(btn => {
    btn.addEventListener('click', () => navigateSlide(btn, -1));
  });

  popup.querySelectorAll('.next-slide').forEach(btn => {
    btn.addEventListener('click', () => navigateSlide(btn, 1));
  });

  function navigateSlide(button, direction) {
    const slideWrapper = button.closest('.slideshow-row').querySelector('.slide-wrapper');
    const slides = slideWrapper.querySelectorAll('.slide-img');
    let currentIndex = [...slides].findIndex(slide => slide.classList.contains('active'));
    
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + direction + slides.length) % slides.length;
    slides[currentIndex].classList.add('active');
  }

  // Auto-click the first tab to initialize
  if (tabButtons.length) tabButtons[0].click();
});
