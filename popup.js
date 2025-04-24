// Select all pop-up triggers
const popupTriggers = document.querySelectorAll('.popup-trigger');

// Add event listeners to each trigger
popupTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    const popupId = trigger.getAttribute('data-popup');
    const popup = document.getElementById(popupId);

    // First, hide all popups before showing the target
    document.querySelectorAll('.popup-container').forEach(p => {
      p.style.display = 'none';
    });

    // Then display the intended popup
    if (popup) {
      popup.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // optional: prevent background scrolling
    }
  });
});

// Close buttons functionality
const closeButtons = document.querySelectorAll('.close-button');
closeButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const popup = event.target.closest('.popup-container');
    popup.style.display = 'none';
    document.body.style.overflow = 'auto'; // optional: restore scrolling
  });
});

// Close pop-up when clicking outside the content
window.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup-container')) {
    event.target.style.display = 'none';
    document.body.style.overflow = 'auto'; // optional: restore scrolling
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
