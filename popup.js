   // Select all pop-up triggers
   const popupTriggers = document.querySelectorAll('.popup-trigger');
  
   // Add event listeners to each trigger
   popupTriggers.forEach(trigger => {
     trigger.addEventListener('click', () => {
       const popupId = trigger.getAttribute('data-popup');
       const popup = document.getElementById(popupId);
       if (popup) {
         popup.style.display = 'flex';
       }
     });
   });
   
   // Close buttons functionality
   const closeButtons = document.querySelectorAll('.close-button');
   closeButtons.forEach(button => {
     button.addEventListener('click', (event) => {
       const popup = event.target.closest('.popup-container');
       popup.style.display = 'none';
     });
   });
   
   // Close pop-up when clicking outside the content
   window.addEventListener('click', (event) => {
     if (event.target.classList.contains('popup-container')) {
       event.target.style.display = 'none';
     }
   });
   
  let currentSlideIndex = 0;

  // Switch tab content and slideshow section
  document.querySelectorAll(".tab-button").forEach((button, index) => {
    button.addEventListener("click", () => {
      const tabId = button.dataset.tab;

      // Tabs
      document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      document.querySelectorAll(".tab-content").forEach(content => {
        content.classList.toggle("active", content.id === tabId);
      });

      // Slideshows
      document.querySelectorAll(".tab-slideshow").forEach(slide => {
        slide.classList.toggle("active", slide.id === `slideshow-${tabId}`);
      });

      // Reset slide index for new section
      currentSlideIndex = 0;
      updateActiveSlide();
    });
  });

  function updateActiveSlide() {
    const activeSlideshow = document.querySelector(".tab-slideshow.active");
    if (!activeSlideshow) return;

    const slides = activeSlideshow.querySelectorAll(".slide-img");
    slides.forEach((img, i) => {
      img.classList.toggle("active", i === currentSlideIndex);
    });
  }

  // Navigation buttons
  document.querySelectorAll(".prev-slide").forEach(btn => {
    btn.addEventListener("click", () => {
      const active = btn.closest(".tab-slideshow.active");
      const slides = active.querySelectorAll(".slide-img");
      currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
      updateActiveSlide();
    });
  });

  document.querySelectorAll(".next-slide").forEach(btn => {
    btn.addEventListener("click", () => {
      const active = btn.closest(".tab-slideshow.active");
      const slides = active.querySelectorAll(".slide-img");
      currentSlideIndex = (currentSlideIndex + 1) % slides.length;
      updateActiveSlide();
    });
  });

  updateActiveSlide();
