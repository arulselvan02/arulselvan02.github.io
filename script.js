// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeContactForm();
    initializeMobileMenu();
    initializeTypingAnimation();
});

// Navigation functionality
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            const navToggle = document.querySelector('.nav-toggle');
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Active link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll effects for animations
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .skill-item, .about-stats, .contact-item, .certificate-card, .achievement-item');
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize animations
function initializeAnimations() {
    // Add CSS classes for animations
    const style = document.createElement('style');
    style.textContent = `
        .project-card,
        .skill-item,
        .about-stats,
        .contact-item,
        .certificate-card,
        .achievement-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .project-card.animate,
        .skill-item.animate,
        .about-stats.animate,
        .contact-item.animate,
        .certificate-card.animate,
        .achievement-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .project-card:nth-child(1).animate {
            transition-delay: 0.1s;
        }
        
        .project-card:nth-child(2).animate {
            transition-delay: 0.2s;
        }
        
        .project-card:nth-child(3).animate {
            transition-delay: 0.3s;
        }
        
        .skill-item:nth-child(1).animate {
            transition-delay: 0.1s;
        }
        
        .skill-item:nth-child(2).animate {
            transition-delay: 0.2s;
        }
        
        .skill-item:nth-child(3).animate {
            transition-delay: 0.3s;
        }
        
        .skill-item:nth-child(4).animate {
            transition-delay: 0.4s;
        }
        
        .skill-item:nth-child(5).animate {
            transition-delay: 0.5s;
        }
        
        .skill-item:nth-child(6).animate {
            transition-delay: 0.6s;
        }
        
        .certificate-card:nth-child(1).animate {
            transition-delay: 0.1s;
        }
        
        .certificate-card:nth-child(2).animate {
            transition-delay: 0.2s;
        }
        
        .certificate-card:nth-child(3).animate {
            transition-delay: 0.3s;
        }
        
        .achievement-item:nth-child(1).animate {
            transition-delay: 0.1s;
        }
        
        .achievement-item:nth-child(2).animate {
            transition-delay: 0.2s;
        }
        
        .achievement-item:nth-child(3).animate {
            transition-delay: 0.3s;
        }
    `;
    document.head.appendChild(style);
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const successMessage = document.getElementById('formSuccess');
    
    // Form validation
    function validateForm() {
        let isValid = true;
        
        // Clear previous errors
        clearErrors();
        
        // Validate name
        if (!nameInput.value.trim()) {
            showError('nameError', 'Please enter your full name');
            isValid = false;
        } else if (nameInput.value.trim().length < 2) {
            showError('nameError', 'Name must be at least 2 characters long');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            showError('emailError', 'Please enter your email address');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate subject
        if (!subjectInput.value.trim()) {
            showError('subjectError', 'Please enter a subject');
            isValid = false;
        } else if (subjectInput.value.trim().length < 5) {
            showError('subjectError', 'Subject must be at least 5 characters long');
            isValid = false;
        }
        
        // Validate message
        if (!messageInput.value.trim()) {
            showError('messageError', 'Please enter your message');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showError('messageError', 'Message must be at least 10 characters long');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(errorId, message) {
        const errorElement = document.getElementById(errorId);
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    function clearErrors() {
        const errorElements = contactForm.querySelectorAll('.form-error');
        errorElements.forEach(element => {
            element.textContent = '';
            element.classList.remove('show');
        });
    }
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        // Show loading state
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Hide loading state
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            
            // Show success message
            successMessage.classList.add('show');
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
        }, 2000);
    });
    
    // Real-time validation
    const inputs = [nameInput, emailInput, subjectInput, messageInput];
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim()) {
                validateForm();
            }
        });
        
        input.addEventListener('input', function() {
            const errorId = this.id + 'Error';
            const errorElement = document.getElementById(errorId);
            if (errorElement.classList.contains('show')) {
                errorElement.classList.remove('show');
            }
        });
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
    
    // Close menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// Typing animation for hero section
function initializeTypingAnimation() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const text = 'B.E. Electrical & Electronics Engineering Student';
    const speed = 80;
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            heroSubtitle.textContent = text.substring(0, index + 1);
            index++;
            setTimeout(typeWriter, speed);
        } else {
            // Add blinking cursor effect
            heroSubtitle.innerHTML = text + '<span class="cursor">|</span>';
            
            // Add cursor blinking CSS
            const cursorStyle = document.createElement('style');
            cursorStyle.textContent = `
                .cursor {
                    animation: blink 1s infinite;
                    color: var(--primary-purple);
                    font-weight: bold;
                }
                
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
            `;
            document.head.appendChild(cursorStyle);
            
            // Remove cursor after 3 seconds
            setTimeout(() => {
                heroSubtitle.textContent = text;
            }, 3000);
        }
    }
    
    // Start typing animation after page load
    setTimeout(() => {
        heroSubtitle.textContent = '';
        typeWriter();
    }, 1000);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth reveal animations
function revealElements() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Throttled scroll event
const throttledReveal = debounce(revealElements, 100);
window.addEventListener('scroll', throttledReveal);

// Particle effect for hero section (optional enhancement)
function initializeParticles() {
    const hero = document.querySelector('.hero');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    hero.appendChild(particlesContainer);
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(107, 70, 193, 0.6);
            border-radius: 50%;
            animation: float-particle ${Math.random() * 10 + 5}s infinite linear;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.8 + 0.2};
        `;
        particlesContainer.appendChild(particle);
    }
    
    // Add particle animation CSS
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes float-particle {
            0% {
                transform: translateY(0) rotate(0deg);
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(particleStyle);
}

// Initialize particles on larger screens
if (window.innerWidth > 768) {
    initializeParticles();
}

// Lazy loading for images (if any are added later)
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance monitoring
function initializePerformanceMonitoring() {
    // Log performance metrics
    window.addEventListener('load', function() {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        
        // Track largest contentful paint
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.entryType === 'largest-contentful-paint') {
                        console.log('LCP:', entry.startTime, 'ms');
                    }
                });
            });
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }
    });
}

// Initialize performance monitoring in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    initializePerformanceMonitoring();
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Accessibility enhancements
function initializeAccessibility() {
    // Skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-purple);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID
    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.id = 'main-content';
    }
    
    // Keyboard navigation for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = card.querySelector('.project-link');
                if (link) {
                    link.click();
                }
            }
        });
    });
}

// Initialize accessibility features
initializeAccessibility();

// Print functionality
function initializePrintStyles() {
    const printButton = document.createElement('button');
    printButton.textContent = 'Print Portfolio';
    printButton.className = 'btn btn-secondary print-btn';
    printButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        display: none;
    `;
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    document.body.appendChild(printButton);
    
    // Show print button on larger screens
    if (window.innerWidth > 768) {
        printButton.style.display = 'block';
    }
}

// Initialize print functionality
initializePrintStyles();
