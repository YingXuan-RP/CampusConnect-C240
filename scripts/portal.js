// ===================================
// CampusConnect Portal JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initializeSlideshow();
    initializeIframeHandling();
    initializeSmoothScroll();
});

// ===================================
// Hero Slideshow Functionality
// ===================================
function initializeSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    if (slides.length === 0) return;

    // Function to show specific slide
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Wrap around if index is out of bounds
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        // Add active class to current slide and dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Function to go to next slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Function to go to previous slide
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Auto-advance slides every 4 seconds
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 4000);
    }

    // Stop slideshow
    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopSlideshow();
            showSlide(index);
            startSlideshow();
        });
    });

    // Pause on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', stopSlideshow);
        slideshowContainer.addEventListener('mouseleave', startSlideshow);
    }

    // Start the slideshow
    startSlideshow();
}

// ===================================
// Smooth Scroll for Explore Button
// ===================================
function initializeSmoothScroll() {
    const exploreButtons = document.querySelectorAll('.explore-btn');
    
    exploreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===================================
// Iframe Height Management
// ===================================
function initializeIframeHandling() {
    const iframe = document.querySelector('.iframe-container iframe');
    if (!iframe) return;

    // Set initial height
    adjustIframeHeight();

    // Adjust on window resize
    window.addEventListener('resize', adjustIframeHeight);

    // Listen for messages from iframe (if child pages send height updates)
    window.addEventListener('message', function(event) {
        // Security: validate origin if needed
        if (event.data && event.data.type === 'resize') {
            const height = event.data.height;
            if (height && typeof height === 'number') {
                iframe.style.height = height + 'px';
            }
        }
    });

    // Handle iframe load event
    iframe.addEventListener('load', function() {
        console.log('Iframe loaded successfully');
        adjustIframeHeight();
    });

    // Handle iframe errors
    iframe.addEventListener('error', function() {
        console.error('Failed to load iframe content');
        showIframeError();
    });
}

function adjustIframeHeight() {
    const iframe = document.querySelector('.iframe-container iframe');
    if (!iframe) return;

    const navbar = document.querySelector('.navbar');
    const infoTip = document.querySelector('.info-tip');
    
    const navbarHeight = navbar ? navbar.offsetHeight : 70;
    const tipHeight = infoTip ? infoTip.offsetHeight : 45;
    
    const calculatedHeight = window.innerHeight - navbarHeight - tipHeight;
    iframe.style.height = calculatedHeight + 'px';
}

function showIframeError() {
    const container = document.querySelector('.iframe-container');
    if (!container) return;

    container.innerHTML = `
        <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            padding: 40px;
            text-align: center;
            color: #6B7280;
        ">
            <svg xmlns="http://www.w3.org/2000/svg" style="width: 64px; height: 64px; margin-bottom: 20px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 style="font-size: 1.25rem; margin-bottom: 12px; color: #1F2937;">Failed to Load Content</h3>
            <p style="margin-bottom: 20px;">The service content could not be loaded. Please try again.</p>
            <a href="./index.html" style="
                background-color: #0B8F3A;
                color: white;
                padding: 10px 24px;
                border-radius: 6px;
                font-weight: 600;
                text-decoration: none;
            ">← Back to Portal</a>
        </div>
    `;
}

// ===================================
// Accessibility Enhancements
// ===================================

// Add keyboard navigation for service features
document.querySelectorAll('.service-feature').forEach(feature => {
    feature.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.location.href = feature.getAttribute('href');
        }
    });
});

// ===================================
// Analytics (Optional - placeholder)
// ===================================
function trackServiceAccess(serviceName) {
    // Placeholder for analytics tracking
    console.log('Service accessed:', serviceName);
    // Example: Send to analytics service
    // analytics.track('service_access', { service: serviceName });
}

// Track service feature clicks
document.querySelectorAll('.service-feature').forEach(feature => {
    feature.addEventListener('click', function() {
        const serviceName = this.querySelector('.feature-title')?.textContent;
        if (serviceName) {
            trackServiceAccess(serviceName);
        }
    });
});
