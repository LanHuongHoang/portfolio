
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

  // === CLOSE POPUP + RESET ===
document.querySelectorAll('.close-button').forEach(button => {
  button.addEventListener('click', (event) => {
    const popup = event.target.closest('.popup-container');
    closeAndResetPopup(popup);
  });
});

window.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup-container')) {
    closeAndResetPopup(event.target);
  }
});

function closeAndResetPopup(popup) {
  popup.style.display = 'none';
  document.body.style.overflow = 'auto';

  // Reset tabs
  popup.querySelectorAll('.tab-button').forEach((btn, index) => {
    btn.classList.toggle('active', index === 0);
  });

  // Reset content
  popup.querySelectorAll('.tab-content').forEach((content, index) => {
    content.classList.toggle('active', index === 0);
  });

  // Reset iframe videos
  popup.querySelectorAll('iframe').forEach(iframe => {
    const src = iframe.src;
    iframe.src = '';
    iframe.src = src;
  });

  // Reset slides
  popup.querySelectorAll('.slide-wrapper').forEach(wrapper => {
    const slides = wrapper.querySelectorAll('.slide-img');
    slides.forEach((img, i) => {
      img.classList.toggle('active', i === 0);
    });
  });
}
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
