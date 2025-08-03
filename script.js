// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Upload Form Toggle
function toggleUploadForm() {
    const uploadForm = document.getElementById('uploadForm');
    if (uploadForm) {
        uploadForm.classList.toggle('hidden');
        uploadForm.classList.toggle('visible');
    }
}

// Submit Upload Form
function submitUpload() {
    const form = document.getElementById('uploadForm');
    const formData = new FormData();
    
    // Get form values
    const materialType = document.getElementById('materialType').value;
    const branch = document.getElementById('branch').value;
    const year = document.getElementById('year').value;
    const subject = document.getElementById('subject').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const file = document.getElementById('file').files[0];
    const uploaderName = document.getElementById('uploaderName').value;
    
    // Validate required fields
    if (!materialType || !branch || !year || !subject || !title || !file || !uploaderName) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Validate file type
    const allowedTypes = ['.pdf', '.doc', '.docx', '.ppt', '.pptx'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
        alert('Please upload a valid file type (PDF, DOC, DOCX, PPT, PPTX).');
        return;
    }
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
        alert('File size should not exceed 10MB.');
        return;
    }
    
    // In a real application, you would send this data to a server
    // For now, we'll just show a success message
    alert('Thank you for your contribution! Your material has been submitted for review and will be available soon.');
    
    // Reset form
    form.reset();
    toggleUploadForm();
}

// Filter Resources (Notes & PYQ Page)
function filterResources() {
    const typeFilter = document.getElementById('filterType')?.value || 'all';
    const branchFilter = document.getElementById('filterBranch')?.value || 'all';
    const yearFilter = document.getElementById('filterYear')?.value || 'all';
    const searchInput = document.getElementById('searchInput')?.value.toLowerCase() || '';
    
    const resourceCards = document.querySelectorAll('.resource-card');
    
    resourceCards.forEach(card => {
        const cardType = card.getAttribute('data-type');
        const cardBranch = card.getAttribute('data-branch');
        const cardYear = card.getAttribute('data-year');
        const cardSubject = card.getAttribute('data-subject')?.toLowerCase() || '';
        const cardTitle = card.querySelector('.resource-title')?.textContent.toLowerCase() || '';
        
        let showCard = true;
        
        // Filter by type
        if (typeFilter !== 'all' && cardType !== typeFilter) {
            showCard = false;
        }
        
        // Filter by branch
        if (branchFilter !== 'all' && cardBranch !== branchFilter) {
            showCard = false;
        }
        
        // Filter by year
        if (yearFilter !== 'all' && cardYear !== yearFilter) {
            showCard = false;
        }
        
        // Filter by search
        if (searchInput && !cardSubject.includes(searchInput) && !cardTitle.includes(searchInput)) {
            showCard = false;
        }
        
        // Show/hide card
        card.style.display = showCard ? 'block' : 'none';
    });
}

// Filter Placements (Placement Records Page)
function filterPlacements() {
    const companyTypeFilter = document.getElementById('filterCompanyType')?.value || 'all';
    const roleFilter = document.getElementById('filterRole')?.value || 'all';
    const ctcFilter = document.getElementById('filterCTC')?.value || 'all';
    const searchCompany = document.getElementById('searchCompany')?.value.toLowerCase() || '';
    
    const placementCards = document.querySelectorAll('.placement-card');
    
    placementCards.forEach(card => {
        const cardType = card.getAttribute('data-type');
        const cardRole = card.getAttribute('data-role');
        const cardCTC = parseFloat(card.getAttribute('data-ctc'));
        const companyName = card.querySelector('.company-info h3')?.textContent.toLowerCase() || '';
        
        let showCard = true;
        
        // Filter by company type
        if (companyTypeFilter !== 'all' && cardType !== companyTypeFilter) {
            showCard = false;
        }
        
        // Filter by role
        if (roleFilter !== 'all' && cardRole !== roleFilter) {
            showCard = false;
        }
        
        // Filter by CTC
        if (ctcFilter !== 'all') {
            switch (ctcFilter) {
                case '0-5':
                    if (cardCTC > 5) showCard = false;
                    break;
                case '5-10':
                    if (cardCTC < 5 || cardCTC > 10) showCard = false;
                    break;
                case '10-20':
                    if (cardCTC < 10 || cardCTC > 20) showCard = false;
                    break;
                case '20+':
                    if (cardCTC < 20) showCard = false;
                    break;
            }
        }
        
        // Filter by company search
        if (searchCompany && !companyName.includes(searchCompany)) {
            showCard = false;
        }
        
        // Show/hide card
        card.style.display = showCard ? 'block' : 'none';
    });
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Validate required fields
        if (!name || !email || !subject || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // In a real application, you would send this data to a server
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const scrollButton = document.getElementById('scrollToTop');
    if (scrollButton) {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    }
});

// Add loading animation for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        if (this.type === 'submit' || this.classList.contains('download-btn')) {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;
            
            // Re-enable button after 2 seconds (simulate loading)
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
        }
    });
});

// Add animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .resource-card, .placement-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function() {
    animateOnScroll();
    
    // Add fade-in animation to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Download functionality (placeholder)
function downloadFile(fileName, fileType) {
    // In a real application, this would trigger an actual download
    alert(`Downloading ${fileName}...\nFile Type: ${fileType}\nThis is a demo - actual download functionality would be implemented with server-side code.`);
}

// Preview functionality (placeholder)
function previewFile(fileName) {
    // In a real application, this would open a preview modal or new tab
    alert(`Opening preview for ${fileName}...\nThis is a demo - actual preview functionality would be implemented with a document viewer.`);
}

// Add click handlers for download and preview buttons
document.addEventListener('DOMContentLoaded', function() {
    // Download buttons
    document.querySelectorAll('.btn-primary.btn-small').forEach(button => {
        if (button.innerHTML.includes('Download')) {
            button.addEventListener('click', function() {
                const card = this.closest('.resource-card');
                const title = card.querySelector('.resource-title').textContent;
                downloadFile(title, 'PDF');
            });
        }
    });
    
    // Preview buttons
    document.querySelectorAll('.btn-secondary.btn-small').forEach(button => {
        if (button.innerHTML.includes('Preview')) {
            button.addEventListener('click', function() {
                const card = this.closest('.resource-card');
                const title = card.querySelector('.resource-title').textContent;
                previewFile(title);
            });
        }
    });
});

// Search functionality enhancement
function enhancedSearch(query) {
    const searchResults = [];
    const allCards = document.querySelectorAll('.resource-card, .placement-card');
    
    allCards.forEach(card => {
        const cardText = card.textContent.toLowerCase();
        if (cardText.includes(query.toLowerCase())) {
            searchResults.push(card);
        }
    });
    
    return searchResults;
}

// Utility function to format numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close modals or forms
    if (e.key === 'Escape') {
        const uploadForm = document.getElementById('uploadForm');
        if (uploadForm && !uploadForm.classList.contains('hidden')) {
            toggleUploadForm();
        }
    }
    
    // Ctrl+F to focus search
    if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput') || document.getElementById('searchCompany');
        if (searchInput) {
            searchInput.focus();
        }
    }
});

// Performance optimization: Debounce search input
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

// Apply debounce to search functions
const debouncedFilterResources = debounce(filterResources, 300);
const debouncedFilterPlacements = debounce(filterPlacements, 300);

// Update search inputs to use debounced functions
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchCompany = document.getElementById('searchCompany');
    
    if (searchInput) {
        searchInput.removeEventListener('input', filterResources);
        searchInput.addEventListener('input', debouncedFilterResources);
    }
    
    if (searchCompany) {
        searchCompany.removeEventListener('input', filterPlacements);
        searchCompany.addEventListener('input', debouncedFilterPlacements);
    }
});

console.log('EduConnect website loaded successfully!');