// ==== Popup Opening Logic ====
function openPopup(popupId) {
  // Close any currently open popups
  document.querySelectorAll('.popup-container').forEach(popup => {
    popup.style.display = 'none';
  });

  // Open the targeted popup
  const popup = document.getElementById(popupId);
  if (popup) {
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Disable background scrolling
  }
}

// Attach event listeners for popup close buttons
document.querySelectorAll('.close-button').forEach(button => {
  button.addEventListener('click', event => {
    const popup = event.target.closest('.popup-container');
    if (popup) {
      popup.style.display = 'none';
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
  });
});

// Close popup when clicking outside the popup content
window.addEventListener('click', event => {
  if (event.target.classList.contains('popup-container')) {
    event.target.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  }
});

// ==== Hover Effect for Images (Improved) ====
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

// ==== Tabs Logic ====
document.querySelectorAll('.popup-tabs').forEach(tabContainer => {
  const tabButtons = tabContainer.querySelectorAll('.tab-button');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-tab');

      // Update buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const popupContent = button.closest('.popup-inner');
      
      // Update content tabs
      popupContent.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === targetId);
      });

      // Update slideshows
      popupContent.querySelectorAll('.tab-slideshow').forEach(slideshow => {
        slideshow.classList.toggle('active', slideshow.id === `slideshow-${targetId}`);
      });

      // Reset slides to first
      resetSlideshow(popupContent);
    });
  });
});

// ==== Slideshow Logic ====
function resetSlideshow(popupContent) {
  popupContent.querySelectorAll('.tab-slideshow.active').forEach(slideshow => {
    const slides = slideshow.querySelectorAll('.slide-img');
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === 0);
    });
  });
}

document.querySelectorAll('.slideshow-row').forEach(row => {
  const slides = row.querySelectorAll('.slide-img');
  if (slides.length <= 1) return;

  let currentIndex = 0;

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  };

  // Previous button
  row.querySelector('.prev-slide')?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });

  // Next button
  row.querySelector('.next-slide')?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  // Initialize first slide
  showSlide(currentIndex);
});
