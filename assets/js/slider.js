// Featured Posts Slider Functionality
(function() {
  'use strict';
  
  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.featured-posts-slider');
    
    if (!slider) return;
    
    const sliderWrapper = slider.querySelector('.slider-wrapper');
    const sliderItems = slider.querySelectorAll('.slider-item');
    const dotsContainer = slider.querySelector('.slider-dots');
    const dots = slider.querySelectorAll('.slider-dot');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    
    let currentSlide = 0;
    let slideWidth = slider.clientWidth;
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Handle window resize
    function handleResize() {
      slideWidth = slider.clientWidth;
      goToSlide(currentSlide, false);
    }
    
    // Go to specific slide
    function goToSlide(slideIndex, animate = true) {
      if (slideIndex < 0) {
        slideIndex = sliderItems.length - 1;
      } else if (slideIndex >= sliderItems.length) {
        slideIndex = 0;
      }
      
      currentSlide = slideIndex;
      
      // Update active dot
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
      
      // Move slider
      if (!animate) {
        sliderWrapper.style.transition = 'none';
      } else {
        sliderWrapper.style.transition = 'transform 0.5s ease';
      }
      
      sliderWrapper.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
      
      // Reset transition after transform is complete if not animated
      if (!animate) {
        setTimeout(() => {
          sliderWrapper.style.transition = 'transform 0.5s ease';
        }, 50);
      }
    }
    
    // Initialize slider
    function initSlider() {
      // Set initial position
      goToSlide(0, false);
      
      // Add event listeners
      prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
      nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
      
      // Dot navigation
      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
      });
      
      // Handle touch events for mobile
      sliderWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
      });
      
      sliderWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
      });
      
      // Auto-advance slides every 5 seconds
      let autoplayInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 5000);
      
      // Pause autoplay on hover
      slider.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
      });
      
      slider.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(() => {
          goToSlide(currentSlide + 1);
        }, 5000);
      });
      
      // Handle window resize
      window.addEventListener('resize', handleResize);
    }
    
    // Handle swipe gestures
    function handleSwipe() {
      const swipeThreshold = 50;
      
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - next slide
        goToSlide(currentSlide + 1);
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - previous slide
        goToSlide(currentSlide - 1);
      }
    }
    
    // Initialize the slider if it exists on the page
    if (sliderItems.length > 0) {
      initSlider();
    }
  });
})();