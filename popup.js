document.addEventListener('DOMContentLoaded', () => {
  // Popup Logic
  document.querySelectorAll('.popup-trigger').forEach(trigger => {
    trigger.addEventListener('click', event => {
      const popupId = event.currentTarget.getAttribute('data-popup-target');
      const popup = document.getElementById(popupId);
      if (popup) {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close popup (button & outside)
  document.querySelectorAll('.close-button').forEach(btn => {
    btn.addEventListener('click', event => {
      const popup = event.currentTarget.closest('.popup-container');
      popup.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });

  window.addEventListener('click', event => {
    if (event.target.classList.contains('popup-container')) {
      event.target.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // Image hover logic
  document.querySelectorAll('.hover-image').forEach(img => {
    const originalSrc = img.getAttribute('data-original-src');
    const hoverSrc = img.getAttribute('data-hover-src');

    img.addEventListener('mouseover', () => img.src = hoverSrc);
    img.addEventListener('mouseout', () => img.src = originalSrc);
  });

  // Tab switching logic (assume tab buttons are inside popups)
  document.querySelectorAll('.popup-container').forEach(popup => {
    const tabButtons = popup.querySelectorAll('.tab-button');
    const tabContents = popup.querySelectorAll('.tab-content');
    const tabSlideshows = popup.querySelectorAll('.tab-slideshow');
    let currentSlideIndex = 0;

    const updateSlides = (slideshow) => {
      const slides = slideshow.querySelectorAll('.slide-img');
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlideIndex);
      });
    };

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        tabButtons.forEach(button => button.classList.toggle('active', button === btn));
        tabContents.forEach(content => content.classList.toggle('active', content.id === targetTab));
        tabSlideshows.forEach(show => {
          const isActive = show.id === `slideshow-${targetTab}`;
          show.classList.toggle('active', isActive);
          if (isActive) {
            currentSlideIndex = 0;
            updateSlides(show);
          }
        });
      });
    });

    popup.querySelectorAll('.next-slide').forEach(btn => {
      btn.addEventListener('click', () => {
        const activeSlideshow = popup.querySelector('.tab-slideshow.active');
        const slides = activeSlideshow.querySelectorAll('.slide-img');
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        updateSlides(activeSlideshow);
      });
    });

    popup.querySelectorAll('.prev-slide').forEach(btn => {
      btn.addEventListener('click', () => {
        const activeSlideshow = popup.querySelector('.tab-slideshow.active');
        const slides = activeSlideshow.querySelectorAll('.slide-img');
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        updateSlides(activeSlideshow);
      });
    });

    // Initialize the first slide correctly
    const initialSlideshow = popup.querySelector('.tab-slideshow.active');
    if (initialSlideshow) {
      updateSlides(initialSlideshow);
    }
  });
});
