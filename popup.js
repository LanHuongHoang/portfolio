// === POPUP FUNCTIONALITY ===

// Open popup function
function openPopup(popupId) {
  // Close all other popups first
  document.querySelectorAll('.popup-container').forEach(popup => {
    popup.style.display = 'none';
  });

  const popup = document.getElementById(popupId);
  if (popup) {
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

// Close popup buttons functionality
document.querySelectorAll('.close-button').forEach(button => {
  button.addEventListener('click', (event) => {
    const popup = event.target.closest('.popup-container');
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
});

// Close popup when clicking outside content
window.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup-container')) {
    event.target.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// === IMAGE HOVER FUNCTIONALITY ===

document.querySelectorAll('.slide img').forEach(img => {
  const originalSrc = img.getAttribute('src');
  const hoverSrc = img.getAttribute('data-hover-src');

  img.addEventListener('mouseover', () => {
    if (hoverSrc) img.src = hoverSrc;
  });

  img.addEventListener('mouseout', () => {
    img.src = originalSrc;
  });
});

// === ATTACH CLICK EVENTS TO IMAGES (avoid inline onclicks) ===

document.querySelectorAll('.slide img').forEach(img => {
  img.addEventListener('click', () => {
    const popupId = img.getAttribute('data-popup');
    openPopup(popupId);
  });
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

  // === SLIDESHOW NAVIGATION ===
  container.querySelectorAll('.slideshow-row').forEach(row => {
    const slides = row.querySelectorAll('.slide-img');
    if (slides.length <= 1) return;

    let current = 0;

    const updateSlide = (index) => {
      slides.forEach((img, i) => {
        img.classList.toggle('active', i === index);
      });
    };

    row.querySelector('.prev-slide')?.addEventListener('click', () => {
      current = (current - 1 + slides.length) % slides.length;
      updateSlide(current);
    });

    row.querySelector('.next-slide')?.addEventListener('click', () => {
      current = (current + 1) % slides.length;
      updateSlide(current);
    });

    updateSlide(current);
  });
});
