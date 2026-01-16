// CampusConnect Portal - Reusable Portal Functionality

document.addEventListener('DOMContentLoaded', function () {
  // Search functionality
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const servicesGrid = document.getElementById('servicesGrid');

  if (searchInput && searchBtn && servicesGrid) {
    // Function to filter services based on search input
    function filterServices() {
      const searchTerm = searchInput.value.toLowerCase().trim();

      // Get all service cards
      const serviceCards = servicesGrid.querySelectorAll('.service-card');

      serviceCards.forEach((card) => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();

        // Show card if search term matches title or description, or if search is empty
        if (
          searchTerm === '' ||
          title.includes(searchTerm) ||
          description.includes(searchTerm)
        ) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    }

    // Event listeners for search
    searchBtn.addEventListener('click', filterServices);
    searchInput.addEventListener('keyup', filterServices);
    searchInput.addEventListener('input', filterServices);
  }

  // Optional: Auto-adjust iframe height for content
  const iframes = document.querySelectorAll('.iframe-wrapper');
  iframes.forEach((iframe) => {
    iframe.addEventListener('load', function () {
      try {
        // Try to adjust height based on content
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        if (iframeDoc && iframeDoc.body) {
          // Note: This may not work if iframe content is cross-origin
          iframe.style.height = Math.max(
            600,
            iframeDoc.body.scrollHeight + 20
          ) + 'px';
        }
      } catch (e) {
        // Cross-origin iframe - cannot adjust height
        console.log('Cannot adjust iframe height due to cross-origin restrictions');
      }
    });

    // Set a default minimum height in case load event doesn't fire
    if (!iframe.style.height) {
      iframe.style.height = 'calc(100vh - 80px)';
    }
  });

  // Mobile menu toggle (if needed in future)
  const navbarContainer = document.querySelector('.navbar-container');
  if (navbarContainer) {
    // Add mobile responsiveness
    window.addEventListener('resize', function () {
      if (window.innerWidth <= 768) {
        // Mobile adjustments could be added here
      }
    });
  }
});

// Utility function to highlight search terms in results
function highlightSearchTerm(text, term) {
  if (!term) return text;
  const regex = new RegExp(`(${term})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

// Export functions for potential reuse
window.portalUtils = {
  highlightSearchTerm,
};
