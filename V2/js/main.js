/* ==========================================
   MICHAEL MAPLES RACING - MAIN JAVASCRIPT
   Version: 2.0 - Client Revision
   ========================================== */

// ==========================================
// GLOBAL VARIABLES
// ==========================================
let currentLanguage = 'en';
let currentSlide = 0;

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initNavigation();
    initLanguageSwitcher();
    initParticles();
    initStats();
    initCarousel();
    initCarCarousel();
    initGalleryCarousel();
    initTeamCarousel();
    initContactForm();
    initScrollTop();
    initAOS();
});

// ==========================================
// LOADING SCREEN
// ==========================================
function initLoadingScreen() {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.add('hidden');
    }, 2000);
}

// ==========================================
// NAVIGATION
// ==========================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// LANGUAGE SWITCHER
// ==========================================
function initLanguageSwitcher() {
    const langBtn = document.getElementById('langBtn');
    const langBtnMobile = document.getElementById('langBtnMobile');
    const currentLangSpan = document.getElementById('currentLang');
    const currentLangMobileSpan = document.querySelector('.current-lang-mobile');

    function switchLanguage() {
        currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
        updateLanguage();

        // Update both buttons
        const newFlag = currentLanguage === 'en' ? '🇺🇸' : '🇪🇸';
        const newLang = currentLanguage.toUpperCase();

        if (currentLangSpan) currentLangSpan.textContent = newLang;
        if (currentLangMobileSpan) currentLangMobileSpan.textContent = newLang;
        if (langBtn) langBtn.querySelector('.flag-icon').textContent = newFlag;
        if (langBtnMobile) langBtnMobile.querySelector('.flag-icon').textContent = newFlag;
    }

    if (langBtn) langBtn.addEventListener('click', switchLanguage);
    if (langBtnMobile) langBtnMobile.addEventListener('click', switchLanguage);
}

function updateLanguage() {
    const elements = document.querySelectorAll('[data-en]');
    
    elements.forEach(element => {
        const text = element.getAttribute(`data-${currentLanguage}`);
        if (text) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else if (element.tagName === 'BUTTON') {
                element.textContent = text;
            } else {
                element.textContent = text;
            }
        }
    });
}

// ==========================================
// PARTICLE SYSTEM
// ==========================================
function initParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(227, 24, 55, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ==========================================
// STATS COUNTER ANIMATION
// ==========================================
function initStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute('data-target'));
                
                if (!isNaN(target)) {
                    animateCounter(statNumber, target);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// ==========================================
// CAROUSEL FOR MOBILE GALLERY
// ==========================================
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (!track || slides.length === 0) return;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(document.querySelectorAll('.carousel-dot'));

    function updateDots() {
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
        updateDots();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(currentSlide);
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Auto-play (optional)
    let autoplayInterval = setInterval(nextSlide, 5000);

    // Pause autoplay on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });

        carouselContainer.addEventListener('mouseleave', () => {
            autoplayInterval = setInterval(nextSlide, 5000);
        });
    }

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide();
        }
    }
}

// ==========================================
// CONTACT FORM
// ==========================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('formSuccess');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Validate
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Show success message
        successMessage.classList.add('show');
        form.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    });
}

// ==========================================
// SCROLL TO TOP BUTTON
// ==========================================
function initScrollTop() {
    const scrollTopBtn = document.getElementById('scrollTop');

    if (!scrollTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// AOS (ANIMATE ON SCROLL) INITIALIZATION
// ==========================================
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Debounce function for performance
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

// Add ripple effect to buttons
document.querySelectorAll('.cta-btn, .submit-btn').forEach(button => {
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

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
    .cta-btn, .submit-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
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

// ==========================================
// PERFORMANCE OPTIMIZATIONS
// ==========================================

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// CAR CAROUSEL
// ==========================================
function initCarCarousel() {
    const track = document.querySelector('.car-carousel-track');
    const slides = Array.from(document.querySelectorAll('.car-slide'));
    const prevBtn = document.querySelector('.car-prev');
    const nextBtn = document.querySelector('.car-next');
    const indicatorsContainer = document.querySelector('.car-carousel-indicators');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    const slideCount = slides.length;

    // Detect if desktop or mobile
    function isDesktop() {
        return window.innerWidth > 768;
    }

    // Get slides per view based on screen size
    function getSlidesPerView() {
        return isDesktop() ? 3 : 1;
    }

    // Get step size for navigation
    function getStepSize() {
        return isDesktop() ? 3 : 1;
    }

    // Create indicators
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('car-indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToCarSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = Array.from(document.querySelectorAll('.car-indicator'));

    function updateCarousel() {
        let offset;

        if (isDesktop()) {
            // For desktop: move exactly 100% of container width per group of 3
            offset = -(currentIndex / 3) * 100;
        } else {
            // For mobile: show one image at a time
            offset = -currentIndex * 100;
        }

        track.style.transform = `translateX(${offset}%)`;

        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    function goToCarSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    function nextSlide() {
        const stepSize = getStepSize();
        const maxIndex = slideCount - getSlidesPerView();

        if (currentIndex + stepSize > maxIndex) {
            currentIndex = 0;
        } else {
            currentIndex += stepSize;
        }
        updateCarousel();
    }

    function prevSlide() {
        const stepSize = getStepSize();

        if (currentIndex - stepSize < 0) {
            const maxIndex = slideCount - getSlidesPerView();
            currentIndex = Math.floor(maxIndex / stepSize) * stepSize;
        } else {
            currentIndex -= stepSize;
        }
        updateCarousel();
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide();
        }
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        currentIndex = 0;
        updateCarousel();
    });
}

// ==========================================
// GALLERY CAROUSEL
// ==========================================
function initGalleryCarousel() {
    const track = document.querySelector('.gallery-carousel-track');
    const slides = Array.from(document.querySelectorAll('.gallery-slide'));
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    const indicatorsContainer = document.querySelector('.gallery-carousel-indicators');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    const slideCount = slides.length;

    // Detect if desktop or mobile
    function isDesktop() {
        return window.innerWidth > 768;
    }

    // Get slides per view based on screen size
    function getSlidesPerView() {
        return isDesktop() ? 3 : 1;
    }

    // Get step size for navigation
    function getStepSize() {
        return isDesktop() ? 3 : 1;
    }

    // Create indicators
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('gallery-indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToGallerySlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = Array.from(document.querySelectorAll('.gallery-indicator'));

    function updateCarousel() {
        const slidesPerView = getSlidesPerView();
        let offset;

        if (isDesktop()) {
            // For desktop: move exactly 100% of container width per group of 3
            offset = -(currentIndex / 3) * 100;
        } else {
            // For mobile: show one image at a time
            offset = -currentIndex * 100;
        }

        track.style.transform = `translateX(${offset}%)`;

        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    function goToGallerySlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    function nextSlide() {
        const stepSize = getStepSize();
        const maxIndex = slideCount - getSlidesPerView();

        if (currentIndex + stepSize > maxIndex) {
            currentIndex = 0;
        } else {
            currentIndex += stepSize;
        }
        updateCarousel();
    }

    function prevSlide() {
        const stepSize = getStepSize();

        if (currentIndex - stepSize < 0) {
            const maxIndex = slideCount - getSlidesPerView();
            currentIndex = Math.floor(maxIndex / stepSize) * stepSize;
        } else {
            currentIndex -= stepSize;
        }
        updateCarousel();
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide();
        }
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        currentIndex = 0;
        updateCarousel();
    });
}

// ==========================================
// TEAM CAROUSEL
// ==========================================
function initTeamCarousel() {
    const track = document.querySelector('.team-carousel-track');
    const slides = Array.from(document.querySelectorAll('.team-slide'));
    const prevBtn = document.querySelector('.team-prev');
    const nextBtn = document.querySelector('.team-next');
    const indicatorsContainer = document.querySelector('.team-carousel-indicators');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    let slidesToShow = window.innerWidth >= 768 ? 3 : 1;
    const slideCount = slides.length;

    // Create indicators
    const totalIndicators = Math.ceil(slideCount / slidesToShow);
    for (let i = 0; i < totalIndicators; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('team-indicator');
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToTeamSlide(i));
        indicatorsContainer.appendChild(indicator);
    }

    const indicators = Array.from(document.querySelectorAll('.team-indicator'));

    function updateCarousel() {
        const percentage = (100 / slidesToShow) * currentIndex;
        track.style.transform = `translateX(-${percentage}%)`;

        // Update indicators
        const activeIndicator = Math.floor(currentIndex / slidesToShow);
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === activeIndicator);
        });
    }

    function goToTeamSlide(index) {
        currentIndex = index * slidesToShow;
        if (currentIndex >= slideCount) {
            currentIndex = slideCount - slidesToShow;
        }
        updateCarousel();
    }

    function nextSlide() {
        currentIndex += slidesToShow;
        if (currentIndex >= slideCount) {
            currentIndex = 0;
        }
        updateCarousel();
    }

    function prevSlide() {
        currentIndex -= slidesToShow;
        if (currentIndex < 0) {
            currentIndex = Math.floor((slideCount - 1) / slidesToShow) * slidesToShow;
        }
        updateCarousel();
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Handle resize
    window.addEventListener('resize', () => {
        const newSlidesToShow = window.innerWidth >= 768 ? 3 : 1;
        if (newSlidesToShow !== slidesToShow) {
            slidesToShow = newSlidesToShow;
            currentIndex = 0;

            // Recreate indicators
            indicatorsContainer.innerHTML = '';
            const totalIndicators = Math.ceil(slideCount / slidesToShow);
            for (let i = 0; i < totalIndicators; i++) {
                const indicator = document.createElement('div');
                indicator.classList.add('team-indicator');
                if (i === 0) indicator.classList.add('active');
                indicator.addEventListener('click', () => goToTeamSlide(i));
                indicatorsContainer.appendChild(indicator);
            }

            updateCarousel();
        }
    });

    // Auto-play
    let autoplayInterval = setInterval(nextSlide, 5000);

    // Pause on hover
    const carouselWrapper = document.querySelector('.team-carousel-wrapper');
    if (carouselWrapper) {
        carouselWrapper.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });

        carouselWrapper.addEventListener('mouseleave', () => {
            autoplayInterval = setInterval(nextSlide, 5000);
        });
    }

    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide();
        }
    }
}

// Optimize scroll events
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Scroll-related operations
            ticking = false;
        });
        ticking = true;
    }
});

console.log('%c🏁 MICHAEL MAPLES RACING #99 🏁', 'color: #E31837; font-size: 20px; font-weight: bold;');
console.log('%cMaples Motorsports - Built for Speed', 'color: #0066CC; font-size: 14px;');