
document.addEventListener('DOMContentLoaded', () => {
// === OPEN POPUP ===
function openPopup(id) {
  const popup = document.getElementById(id);
  if (popup) {
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}
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

// === TABS ===
document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => {
    const target = button.dataset.tab;
    const popup = button.closest('.popup-container');

    popup.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    popup.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('active', content.id === target);
    });
  });
});

// === SLIDES ===
document.querySelectorAll('.prev-slide').forEach(button => {
  button.addEventListener('click', () => {
    const wrapper = button.parentElement.querySelector('.slide-wrapper');
    const slides = wrapper.querySelectorAll('.slide-img');
    const currentIndex = [...slides].findIndex(slide => slide.classList.contains('active'));
    slides[currentIndex].classList.remove('active');
    slides[(currentIndex - 1 + slides.length) % slides.length].classList.add('active');
  });
});