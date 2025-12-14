// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
}

// Form submission handler
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };
        
        // Here you would typically send the form data to a server
        // For now, we'll just show an alert
        alert('Thank you for your message! We will contact you shortly.');
        
        // Reset form
        contactForm.reset();
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            if (entry.target.classList.contains('contact-item')) {
                entry.target.style.transform = 'translateX(0)';
            } else {
                entry.target.style.transform = 'translateY(0)';
            }
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe contact items
document.querySelectorAll('.contact-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// Testimonials Carousel
const testimonialsCarousel = document.querySelector('.testimonials-carousel');
if (testimonialsCarousel) {
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentSlide = 0;
    let autoSlideInterval;
    let isTransitioning = false;
    
    // Function to show a specific slide
    function showSlide(index) {
        if (isTransitioning || index < 0 || index >= slides.length) return;
        isTransitioning = true;
        
        // Remove active class from all slides and indicators
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (indicators[i]) {
                indicators[i].classList.remove('active');
            }
        });
        
        // Use requestAnimationFrame for smoother transitions
        requestAnimationFrame(() => {
            slides[index].classList.add('active');
            if (indicators[index]) {
                indicators[index].classList.add('active');
            }
            currentSlide = index;
            
            // Reset transition flag after animation completes
            setTimeout(() => {
                isTransitioning = false;
            }, 600);
        });
    }
    
    // Function to go to next slide
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }
    
    // Function to go to previous slide
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }
    
    // Auto-rotate slides every 5 seconds
    function startAutoSlide() {
        stopAutoSlide(); // Clear any existing interval
        autoSlideInterval = setInterval(() => {
            if (!isTransitioning) {
                nextSlide();
            }
        }, 5000);
    }
    
    // Stop auto-rotation when user interacts
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }
    
    // Event listeners for navigation buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            nextSlide();
            stopAutoSlide();
            setTimeout(startAutoSlide, 10000); // Restart after 10 seconds
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            prevSlide();
            stopAutoSlide();
            setTimeout(startAutoSlide, 10000); // Restart after 10 seconds
        });
    }
    
    // Event listeners for indicator dots
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', (e) => {
            e.preventDefault();
            if (index !== currentSlide && !isTransitioning) {
                showSlide(index);
                stopAutoSlide();
                setTimeout(startAutoSlide, 10000); // Restart after 10 seconds
            }
        });
    });
    
    // Initialize carousel
    if (slides.length > 0) {
        // Set initial state
        slides.forEach((slide, i) => {
            if (i === 0) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        if (indicators[0]) {
            indicators[0].classList.add('active');
        }
        
        // Start auto-rotation
        startAutoSlide();
        
        // Pause auto-slide on hover
        testimonialsCarousel.addEventListener('mouseenter', () => {
            stopAutoSlide();
        });
        
        testimonialsCarousel.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }
}

