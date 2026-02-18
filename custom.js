// ==================== UTILITY FUNCTIONS ====================

/**
 * Get current year for footer
 */
function updateYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.innerHTML = currentYear;
    }
}

/**
 * Initialize navigation toggle for mobile
 */
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate toggle button
        const spans = navToggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (navMenu.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(8px, 8px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    });

    // Close menu when clicking on a link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.querySelectorAll('span').forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        });
    });
}

/**
 * Add scroll effect to navbar
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        }
    });
}

/**
 * Initialize form submission
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name') || form.querySelector('input[type="text"]').value,
            email: formData.get('email') || form.querySelector('input[type="email"]').value,
            message: formData.get('message') || form.querySelector('textarea').value
        };

        // Show success message (in real app, send to server)
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = '✓ Message Sent!';
        submitBtn.style.background = '#10a37f';
        
        // Reset form
        form.reset();
        
        // Restore button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
        }, 3000);

        console.log('Form submitted:', data);
    });
}

/**
 * Initialize intersection observer for animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards
    document.querySelectorAll('.about-card, .service-card, .portfolio-item').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

/**
 * Initialize counters for stats
 */
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

/**
 * Smooth scroll behavior for buttons
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Add ripple effect to buttons
 */
function initRippleEffect() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/**
 * Add CSS for ripple animation
 */
function addRippleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }

        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }

        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize theme toggle (optional)
 */
function initThemeToggle() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (prefersDark.matches) {
        // You can add dark mode support here
        console.log('Dark mode preference detected');
    }
}

/**
 * Main initialization function
 */
function init() {
    updateYear();
    initMobileNav();
    initNavbarScroll();
    initContactForm();
    initScrollAnimations();
    initSmoothScroll();
    addRippleStyles();
    initRippleEffect();
    initThemeToggle();
    
    console.log('✓ Captain Lithium\'s Tattoos - All systems initialized');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ==================== LEGACY SUPPORT ====================

// For any Bootstrap or jQuery dependencies that might exist
if (typeof $ !== 'undefined') {
    // Owl carousel if needed
    if ($.fn.owlCarousel) {
        $(".owl-carousel").owlCarousel({
            loop: true,
            margin: 20,
            nav: true,
            navText: [
                '<i class="fa fa-angle-left"></i>',
                '<i class="fa fa-angle-right"></i>'
            ],
            autoplay: true,
            autoplayHoverPause: true,
            responsive: {
                0: { items: 1 },
                768: { items: 2 },
                991: { items: 3 }
            }
        });
    }
}