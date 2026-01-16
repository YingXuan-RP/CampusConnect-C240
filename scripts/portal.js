// ===================================
// CampusConnect Portal JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initializeSearchFilter();
    initializeIframeHandling();
});

// ===================================
// Search Filter Functionality
// ===================================
function initializeSearchFilter() {
    const searchInput = document.getElementById('serviceSearch');
    if (!searchInput) return;

    const servicesGrid = document.getElementById('servicesGrid');
    const noResults = document.getElementById('noResults');

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        const serviceCards = servicesGrid.querySelectorAll('.service-card');
        let visibleCount = 0;

        serviceCards.forEach(card => {
            const searchData = card.getAttribute('data-service') || '';
            const title = card.querySelector('.card-title')?.textContent || '';
            const description = card.querySelector('.card-description')?.textContent || '';
            
            const searchableContent = (searchData + ' ' + title + ' ' + description).toLowerCase();
            
            if (searchableContent.includes(searchTerm)) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Show/hide no results message
        if (visibleCount === 0 && searchTerm !== '') {
            noResults.style.display = 'block';
            servicesGrid.style.display = 'none';
        } else {
            noResults.style.display = 'none';
            servicesGrid.style.display = 'grid';
        }
    });

    // Clear search on escape key
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
            searchInput.blur();
        }
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

// Add keyboard navigation for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.location.href = card.getAttribute('href');
        }
    });
});

// Add focus management
document.addEventListener('keydown', function(e) {
    // Focus search on Ctrl/Cmd + K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('serviceSearch');
        if (searchInput) {
            searchInput.focus();
            searchInput.select();
        }
    }
});

// ===================================
// Performance Optimization
// ===================================

// Debounce function for search
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

// ===================================
// Analytics (Optional - placeholder)
// ===================================
function trackServiceAccess(serviceName) {
    // Placeholder for analytics tracking
    console.log('Service accessed:', serviceName);
    // Example: Send to analytics service
    // analytics.track('service_access', { service: serviceName });
}

// Track service card clicks
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        const serviceName = this.querySelector('.card-title')?.textContent;
        if (serviceName) {
            trackServiceAccess(serviceName);
        }
    });
});
