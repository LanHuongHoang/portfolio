
document.addEventListener('DOMContentLoaded', () => {
  // === POPUP OPEN LOGIC ===
  const triggers = document.querySelectorAll('.popup-trigger');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const popupId = trigger.getAttribute('data-popup');
      const popup = document.getElementById(popupId);
      if (popup) {
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // === POPUP CLOSE LOGIC ===
  const closeButtons = document.querySelectorAll('.close-button');
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const popup = button.closest('.popup-container');
      if (popup) {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  });

  // === CLICK OUTSIDE TO CLOSE ===
  window.addEventListener('click', event => {
    if (event.target.classList.contains('popup-container')) {
      event.target.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
});
// Handle hover image swap
document.querySelectorAll('.hover-image').forEach(img => {
  const originalSrc = img.getAttribute('data-original-src');
  const hoverSrc = img.getAttribute('data-hover-src');

  img.addEventListener('mouseover', () => {
    if (hoverSrc) img.src = hoverSrc;
  });

  img.addEventListener('mouseout', () => {
    if (originalSrc) img.src = originalSrc;
  });
});
document.querySelectorAll('.slide img').forEach(img => {
  const originalSrc = img.getAttribute('src');
  const hoverSrc = img.getAttribute('data-hover-src');

  if (hoverSrc) {
    img.addEventListener('mouseenter', () => {
      img.src = hoverSrc;
    });
    img.addEventListener('mouseleave', () => {
      img.src = originalSrc;
    });
  }
});

// === TABS & SLIDESHOW FUNCTIONALITY ===

document.querySelectorAll('.popup-container').forEach(container => {
  const tabButtons = container.querySelectorAll('.tab-button');
  const tabContents = container.querySelectorAll('.tab-content');
  const tabSlideshows = container.querySelectorAll('.tab-slideshow');

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

      // Reset slideshow index to first slide
      const activeSlides = container.querySelectorAll('.tab-slideshow.active .slide-img');
      activeSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === 0);
      });
    });
  });

  // === SLIDE NAVIGATION LOGIC ===
document.querySelectorAll('.slideshow-row').forEach(row => {
  const slides = row.querySelectorAll('.slide-wrapper .slide-img');
  if (slides.length <= 1) return; // Skip if only one image

  let current = 0;

  function updateSlide() {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === current);
    });
  }

  row.querySelector('.prev-slide')?.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    updateSlide();
  });

  row.querySelector('.next-slide')?.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    updateSlide();
  });

  updateSlide(); // Initial call to show the first slide
});

});
