// === POPUP OPENING ===
function openPopup(id) {
  const popup = document.getElementById(id);
  if (popup) {
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scroll

    // Hide navigation when popup opens
    const nav = document.querySelector('.nav-container');
    if (nav) nav.style.display = 'none';
  }
}

// === POPUP CLOSING ===
document.querySelectorAll('.close-button').forEach(button => {
  button.addEventListener('click', (event) => {
    const popup = event.target.closest('.popup-container');
    if (popup) {
      popup.style.display = 'none';
      document.body.style.overflow = 'auto';

      // Show navigation again when popup closes
      const nav = document.querySelector('.nav-container');
      if (nav) nav.style.display = 'flex';

      // Reset popup content if needed
      resetPopup(popup);
    }
  });
});

// === CLICK OUTSIDE TO CLOSE ===
window.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup-container')) {
    event.target.style.display = 'none';
    document.body.style.overflow = 'auto';

    // Show navigation again when popup closes
    const nav = document.querySelector('.nav-container');
    if (nav) nav.style.display = 'flex';

    resetPopup(event.target);
  }
});


// === RESET POPUP STATE WHEN CLOSED ===
function resetPopup(popup) {
  if (!popup) return;

  // Reset tabs
  const tabButtons = popup.querySelectorAll('.tab-button');
  const tabContents = popup.querySelectorAll('.tab-content');
  const tabSlideshows = popup.querySelectorAll('.tab-slideshow');

  tabButtons.forEach((btn, index) => {
    if (index === 0) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  tabContents.forEach((content, index) => {
    if (index === 0) {
      content.classList.add('active');
    } else {
      content.classList.remove('active');
    }
  });

  tabSlideshows.forEach((slideshow, index) => {
    if (index === 0) {
      slideshow.classList.add('active');
      resetSlideshow(slideshow);
    } else {
      slideshow.classList.remove('active');
    }
  });

  // Pause all videos inside popup (if any)
  popup.querySelectorAll('video').forEach(video => {
    video.pause();
    video.currentTime = 0;
  });

  // Reset iframe (YouTube embeds) if needed
  popup.querySelectorAll('iframe').forEach(iframe => {
    const src = iframe.src;
    iframe.src = src; // reload iframe
  });
}

// === TAB BUTTONS SWITCH ===
document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup-container');
    const target = button.dataset.tab;

    // Deactivate all tabs and slideshows inside this popup
    const tabButtons = popup.querySelectorAll('.tab-button');
    const tabContents = popup.querySelectorAll('.tab-content');
    const tabSlideshows = popup.querySelectorAll('.tab-slideshow');

    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    tabSlideshows.forEach(show => show.classList.remove('active'));

    // Activate selected
    button.classList.add('active');
    popup.querySelector(`#${target}`)?.classList.add('active');
    popup.querySelector(`#slideshow-${target}`)?.classList.add('active');

    // Reset slides inside the newly active tab
    const activeSlideshow = popup.querySelector(`#slideshow-${target}`);
    if (activeSlideshow) resetSlideshow(activeSlideshow);
  });
});

// === SLIDESHOW CONTROL ===
function resetSlideshow(slideshow) {
  const slides = slideshow.querySelectorAll('.slide-img');
  slides.forEach((img, index) => {
    if (index === 0) {
      img.classList.add('active');
    } else {
      img.classList.remove('active');
    }
  });
}

document.querySelectorAll('.prev-slide').forEach(button => {
  button.addEventListener('click', () => {
    const slideshow = button.closest('.tab-slideshow');
    const slides = slideshow.querySelectorAll('.slide-img');
    let current = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
    slides[current].classList.remove('active');
    current = (current - 1 + slides.length) % slides.length;
    slides[current].classList.add('active');
  });
});

document.querySelectorAll('.next-slide').forEach(button => {
  button.addEventListener('click', () => {
    const slideshow = button.closest('.tab-slideshow');
    const slides = slideshow.querySelectorAll('.slide-img');
    let current = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  });
});
