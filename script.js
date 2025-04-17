// Countdown Timer
function updateCountdown() {
  const targetDate = new Date("July 1, 2025 00:00:00").getTime();
  const now = new Date().getTime();
  const timeLeft = targetDate - now;
  
  // If the countdown is over, display zeros
  if (timeLeft < 0) {
    document.getElementById("days").textContent = "0";
    document.getElementById("hours").textContent = "0";
    document.getElementById("minutes").textContent = "0";
    document.getElementById("seconds").textContent = "0";
    return;
  }
  
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

// Update the countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// When the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Check if FontAwesome is loaded properly
  const span = document.createElement('span');
  span.className = 'fas';
  span.style.display = 'none';
  document.body.insertBefore(span, document.body.firstChild);
  
  const before = window.getComputedStyle(span, ':before');
  if (!before.content || before.content === 'none' || before.fontFamily !== '"Font Awesome 6 Free"') {
    console.warn('FontAwesome might not be loading correctly.');
    // Try to reload the CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link);
  }
  
  document.body.removeChild(span);
  
  // FAQ Accordion functionality
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      // Close all other open FAQs
      faqQuestions.forEach(q => {
        if (q !== question && q.classList.contains('active')) {
          q.classList.remove('active');
          const icon = q.querySelector('i');
          if (icon) {
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
          }
          q.nextElementSibling.style.display = 'none';
        }
      });
      
      // Toggle the clicked FAQ
      question.classList.toggle('active');
      const icon = question.querySelector('i');
      if (icon) {
        if (question.classList.contains('active')) {
          icon.classList.remove('fa-chevron-down');
          icon.classList.add('fa-chevron-up');
          question.nextElementSibling.style.display = 'block';
        } else {
          icon.classList.remove('fa-chevron-up');
          icon.classList.add('fa-chevron-down');
          question.nextElementSibling.style.display = 'none';
        }
      }
    });
  });
  
  // Form submission for Formspree
  const signupForm = document.getElementById('beta-signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      // Note: We're not preventing default behavior so the form submits to Formspree
      
      // You can still add client-side validation or tracking here if needed
      console.log('Form submitted to Formspree');
      
      // You might want to show a loading indicator or disable the submit button
      const submitButton = this.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.innerHTML = 'Submitting...';
        submitButton.disabled = true;
      }
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Account for sticky header
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add animation for feature cards on scroll
  const featureCards = document.querySelectorAll('.feature-card');
  const rewardItems = document.querySelectorAll('.reward-item');
  const nftExample = document.querySelector('.nft-example');
  
  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }
  
  // Function to handle scroll animations
  function handleScrollAnimations() {
    // Add animation to feature cards
    featureCards.forEach(card => {
      if (isInViewport(card) && !card.classList.contains('animated')) {
        card.classList.add('animated');
        card.style.animation = 'fadeInUp 0.6s ease-out forwards';
      }
    });
    
    // Add animation to reward items
    rewardItems.forEach((item, index) => {
      if (isInViewport(item) && !item.classList.contains('animated')) {
        item.classList.add('animated');
        item.style.animation = `fadeInLeft ${0.4 + index * 0.2}s ease-out forwards`;
      }
    });
    
    // Add animation to NFT example
    if (nftExample && isInViewport(nftExample) && !nftExample.classList.contains('animated')) {
      nftExample.classList.add('animated');
      nftExample.style.animation = 'pulse 1s ease-out forwards';
    }
  }
  
  // Add CSS for animations
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes fadeInLeft {
      from {
        opacity: 0;
        transform: translateX(-30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes pulse {
      0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(41, 185, 33, 0.7);
      }
      
      70% {
        transform: scale(1);
        box-shadow: 0 0 0 15px rgba(41, 185, 33, 0);
      }
      
      100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(41, 185, 33, 0);
      }
    }
  `;
  document.head.appendChild(styleSheet);
  
  // Initial check for elements in viewport
  handleScrollAnimations();
  
  // Add event listener for scroll
  window.addEventListener('scroll', handleScrollAnimations);
  
  // Hero section parallax effect
  const heroSection = document.getElementById('hero-section');
  if (heroSection) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.pageYOffset;
      heroSection.style.backgroundPosition = `center ${50 + scrollPosition * 0.05}%`;
    });
  }
});