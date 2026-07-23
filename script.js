// =============================
// ADMIN INTEGRATION
// =============================

function loadAdminData() {
    // Load company information from admin panel
    const companyName = localStorage.getItem('companyName') || 'Easy Life Electrician';
    
    // Update logo if exists
    const logo = localStorage.getItem('logo');
    const logoElement = document.querySelector('.logo');
    if (logo && logoElement) {
        logoElement.innerHTML = `<img src="${logo}" alt="${companyName}" style="height: 40px;">`;
    }
    
    // Load and apply admin services
    loadAdminServices();
    
    // Load and apply admin testimonials
    loadAdminTestimonials();
    
    // Apply brand colors if customized
    applyBrandColors();
}

function loadAdminServices() {
    const services = JSON.parse(localStorage.getItem('services') || '[]');
    if (services.length > 0) {
        const servicesGrid = document.querySelector('.services-grid');
        if (servicesGrid) {
            // Only replace if admin has added services
            servicesGrid.innerHTML = '';
            services.forEach(service => {
                const serviceCard = document.createElement('div');
                serviceCard.className = 'service-card';
                serviceCard.innerHTML = `
                    <div class="service-icon">${service.icon}</div>
                    <h4>${service.name}</h4>
                    <p>${service.description}</p>
                `;
                servicesGrid.appendChild(serviceCard);
            });
        }
    }
}

function loadAdminTestimonials() {
    const testimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');
    if (testimonials.length > 0) {
        const testimonialsGrid = document.querySelector('.testimonials-grid');
        if (testimonialsGrid) {
            // Only replace if admin has added testimonials
            testimonialsGrid.innerHTML = '';
            testimonials.forEach(testimonial => {
                const stars = '⭐'.repeat(testimonial.rating);
                const testimonialCard = document.createElement('div');
                testimonialCard.className = 'testimonial-card';
                
                // Create initials for avatar
                const names = testimonial.name.split(' ');
                const initials = names.map(n => n.charAt(0)).join('').substring(0, 2);
                
                testimonialCard.innerHTML = `
                    <div class="testimonial-stars">${stars}</div>
                    <p class="testimonial-text">"${testimonial.text}"</p>
                    <div class="testimonial-author">
                        <div class="author-avatar" style="background: #1e3a8a;">${initials}</div>
                        <div>
                            <p class="author-name">${testimonial.name}</p>
                            <p class="author-title">${testimonial.title}</p>
                        </div>
                    </div>
                `;
                testimonialsGrid.appendChild(testimonialCard);
            });
        }
    }
}

function applyBrandColors() {
    const primaryColor = localStorage.getItem('primaryColor');
    const secondaryColor = localStorage.getItem('secondaryColor');
    const darkGrayColor = localStorage.getItem('darkGrayColor');
    const lightGrayColor = localStorage.getItem('lightGrayColor');
    
    if (primaryColor || secondaryColor || darkGrayColor || lightGrayColor) {
        const style = document.createElement('style');
        let css = ':root {';
        if (primaryColor) css += `--primary-blue: ${primaryColor};`;
        if (secondaryColor) css += `--electric-yellow: ${secondaryColor};`;
        if (darkGrayColor) css += `--dark-gray: ${darkGrayColor};`;
        if (lightGrayColor) css += `--light-gray: ${lightGrayColor};`;
        css += '}';
        style.textContent = css;
        document.head.appendChild(style);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadAdminData);

// Listen for admin updates
window.addEventListener('storage', (e) => {
    if (e.key === 'adminDataUpdated') {
        loadAdminData();
    }
});

// =============================
// MOBILE MENU TOGGLE
// =============================

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navMenu.classList.remove('active');
    }
});

// =============================
// FORM VALIDATION & SUBMISSION
// =============================

const quoteForm = document.getElementById('quoteForm');

if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const fullName = document.getElementById('fullName').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const service = document.getElementById('service').value;
        const location = document.getElementById('location').value.trim();
        const description = document.getElementById('description').value.trim();

        // Validate required fields
        if (!fullName || !phone || !email || !service || !location || !description) {
            alert('Please fill in all required fields.');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Validate phone (basic check for digits)
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid phone number.');
            return;
        }

        // If validation passes, show success message
        const submitBtn = quoteForm.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = '✓ Quote Request Submitted!';
        submitBtn.disabled = true;
        submitBtn.style.backgroundColor = '#10b981';

        // Reset form
        quoteForm.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = '';
        }, 3000);

        console.log('Form Data:', {
            fullName,
            phone,
            email,
            service,
            location,
            description
        });
    });
}

// =============================
// SMOOTH SCROLL BEHAVIOR
// =============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || !document.querySelector(href)) {
            return;
        }
        
        // Scroll is already smooth due to CSS, but we can enhance it
        const target = document.querySelector(href);
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// =============================
// WHATSAPP INTEGRATION
// =============================

document.addEventListener('DOMContentLoaded', function() {
    const whatsappLinks = document.querySelectorAll('.whatsapp-link');
    
    whatsappLinks.forEach(link => {
        if (link.getAttribute('href').includes('wa.me')) {
            link.addEventListener('click', function(e) {
                // Track WhatsApp interaction (optional)
                console.log('WhatsApp link clicked');
            });
        }
    });
});

// =============================
// ANIMATION ON SCROLL
// =============================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards, benefit cards, testimonial cards, etc.
document.querySelectorAll('.service-card, .benefit-card, .about-item, .testimonial-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// =============================
// NAVIGATION ACTIVE STATE
// =============================

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// =============================
// GALLERY HOVER EFFECTS
// =============================

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 12px 30px rgba(30, 58, 138, 0.3)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    });
});

// =============================
// DYNAMIC PHONE NUMBER FORMATTING
// =============================

const phoneInput = document.getElementById('phone');

if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 6) {
                value = value.slice(0, 3) + '-' + value.slice(3);
            } else if (value.length <= 10) {
                value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6);
            } else {
                value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
            }
        }
        
        e.target.value = value;
    });
}

// =============================
// PERFORMANCE OPTIMIZATION
// =============================

// Lazy load images if image optimization is implemented
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
});

// =============================
// UTILITY FUNCTIONS
// =============================

// Get current year for footer (if needed)
function getCurrentYear() {
    return new Date().getFullYear();
}

// Format phone number display
function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phoneNumber;
}

// Log initialization
console.log('Easy Life Electrician Consult - Website Initialized');
console.log('Current Year:', getCurrentYear());
console.log('Admin Integration: Active');
