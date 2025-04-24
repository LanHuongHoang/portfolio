// Open Popup
document.querySelectorAll('.popup-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const popupId = trigger.getAttribute('data-popup');
    const popup = document.getElementById(popupId);
    if (popup) popup.style.display = 'flex';
  });
});

// Close Popup
document.querySelectorAll('.close-button').forEach(button => {
  button.addEventListener('click', () => {
    button.closest('.popup-container').style.display = 'none';
  });
});

// For each popup independently:
document.querySelectorAll('.popup-container').forEach(popup => {
  
  // Scoped selections (tabs, contents, slides)
  const tabButtons = popup.querySelectorAll('.tab-button');
  const tabContents = popup.querySelectorAll('.tab-content');
  const tabSlideshows = popup.querySelectorAll('.tab-slideshow');

  // Tabs Logic (Scoped)
  tabButtons.forEach(tabButton => {
    tabButton.addEventListener('click', () => {

      // Tabs active state
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabButton.classList.add('active');

      const targetId = tabButton.getAttribute('data-tab');

      // Content active state
      tabContents.forEach(content => {
        content.classList.toggle('active', content.id === targetId);
      });

      // Slideshow active state
      tabSlideshows.forEach(slideshow => {
        slideshow.classList.toggle('active', slideshow.id === `slideshow-${targetId}`);
        
        // Reset slideshow to first slide on tab change
        resetSlideshow(slideshow);
      });

    });
  });

  // Slideshow Logic (Scoped)
  const prevButtons = popup.querySelectorAll('.prev-slide');
  const nextButtons = popup.querySelectorAll('.next-slide');

  prevButtons.forEach(button => {
    button.addEventListener('click', () => {
      navigateSlide(button, -1);
    });
  });

  nextButtons.forEach(button => {
    button.addEventListener('click', () => {
      navigateSlide(button, 1);
    });
  });

  // Slideshow helper functions (Scoped)
  function navigateSlide(button, direction) {
    const slideWrapper = button.closest('.slideshow-row').querySelector('.slide-wrapper');
    const slides = slideWrapper.querySelectorAll('.slide-img');
    const currentSlide = slideWrapper.querySelector('.slide-img.active');
    let currentIndex = Array.from(slides).indexOf(currentSlide);

    currentSlide.classList.remove('active');
    let newIndex = (currentIndex + direction + slides.length) % slides.length;
    slides[newIndex].classList.add('active');
  }

  function resetSlideshow(slideshow) {
    const slides = slideshow.querySelectorAll('.slide-img');
    slides.forEach((slide, i) => slide.classList.toggle('active', i === 0));
  }

  // Initialize the first tab and slideshow active when popup is opened
  tabButtons[0]?.click();

});
