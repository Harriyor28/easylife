// =============================
// ADMIN PANEL JAVASCRIPT
// =============================

// Configuration
const ADMIN_PASSWORD = 'admin123'; // Change this to a secure password
let isAuthenticated = false;
let currentEditingService = null;
let currentEditingTestimonial = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (!isAuthenticated && !localStorage.getItem('adminAuthenticated')) {
        document.getElementById('loginModal').style.display = 'flex';
    } else {
        isAuthenticated = true;
        document.getElementById('loginModal').style.display = 'none';
        initializeAdmin();
    }
});

// =============================
// AUTHENTICATION
// =============================

function handleLogin(event) {
    event.preventDefault();
    const password = document.getElementById('loginPassword').value;
    
    if (password === ADMIN_PASSWORD) {
        isAuthenticated = true;
        localStorage.setItem('adminAuthenticated', 'true');
        document.getElementById('loginModal').style.display = 'none';
        document.getElementById('loginPassword').value = '';
        initializeAdmin();
        showAlert('Login successful!', 'success');
    } else {
        document.getElementById('loginError').style.display = 'block';
        setTimeout(() => {
            document.getElementById('loginError').style.display = 'none';
        }, 3000);
    }
}

function logout() {
    isAuthenticated = false;
    localStorage.removeItem('adminAuthenticated');
    document.getElementById('loginModal').style.display = 'flex';
    document.getElementById('loginPassword').value = '';
    clearAllForms();
}

document.getElementById('logoutBtn').addEventListener('click', logout);

// =============================
// INITIALIZATION
// =============================

function initializeAdmin() {
    loadAllData();
    setupEventListeners();
    updateDashboard();
    loadServices();
    loadTestimonials();
}

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            switchSection(this.dataset.section);
        });
    });

    // Save buttons
    document.getElementById('saveAllBtn').addEventListener('click', saveAllData);
    document.getElementById('previewBtn').addEventListener('click', previewSite);

    // Color inputs
    document.getElementById('primaryColor').addEventListener('input', syncColorInputs);
    document.getElementById('secondaryColor').addEventListener('input', syncColorInputs);
    document.getElementById('darkGrayColor').addEventListener('input', syncColorInputs);
    document.getElementById('lightGrayColor').addEventListener('input', syncColorInputs);

    // Service management
    document.getElementById('addServiceBtn').addEventListener('click', openAddServiceModal);

    // Testimonial management
    document.getElementById('addTestimonialBtn').addEventListener('click', openAddTestimonialModal);

    // File uploads
    document.getElementById('logoUpload').addEventListener('change', handleLogoUpload);
    document.getElementById('heroImage').addEventListener('change', handleHeroImageUpload);

    // Export/Import
    document.getElementById('exportBtn').addEventListener('click', exportData);
    document.getElementById('importBtn').addEventListener('click', () => {
        document.getElementById('importFile').click();
    });
    document.getElementById('importFile').addEventListener('change', importData);

    // Reset
    document.getElementById('resetBtn').addEventListener('click', () => {
        if (confirm('Are you sure? This will reset all data to defaults.')) {
            resetToDefaults();
        }
    });
}

// =============================
// SECTION NAVIGATION
// =============================

function switchSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Remove active from nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Show selected section
    const section = document.getElementById(sectionName);
    if (section) {
        section.classList.add('active');
    }

    // Mark nav link as active
    const link = document.querySelector(`[data-section="${sectionName}"]`);
    if (link) {
        link.classList.add('active');
    }
}

function scrollToSection(sectionName) {
    switchSection(sectionName);
}

// =============================
// DATA MANAGEMENT
// =============================

function loadAllData() {
    // Load company info
    document.getElementById('companyName').value = localStorage.getItem('companyName') || 'Easy Life Electrician Consult';
    document.getElementById('tagline').value = localStorage.getItem('tagline') || 'Powering Homes, Businesses, and a Sustainable Future.';
    document.getElementById('heroHeadline').value = localStorage.getItem('heroHeadline') || 'Professional Electrical & Solar Installation Services';
    document.getElementById('heroSubtitle').value = localStorage.getItem('heroSubtitle') || 'Easy Life Electrician Consult provides reliable electrical services...';
    document.getElementById('aboutText').value = localStorage.getItem('aboutText') || 'Easy Life Electrician Consult is a professional...';

    // Load contact info
    document.getElementById('phone').value = localStorage.getItem('phone') || '+234 700 000 0000';
    document.getElementById('whatsapp').value = localStorage.getItem('whatsapp') || '+2347000000000';
    document.getElementById('email').value = localStorage.getItem('email') || 'info@easylifeelectrician.com';
    document.getElementById('address').value = localStorage.getItem('address') || 'Lagos, Nigeria';
    document.getElementById('serviceAreas').value = localStorage.getItem('serviceAreas') || 'All States in Nigeria';

    // Load branding
    const primaryColor = localStorage.getItem('primaryColor') || '#1e3a8a';
    const secondaryColor = localStorage.getItem('secondaryColor') || '#fbbf24';
    const darkGrayColor = localStorage.getItem('darkGrayColor') || '#374151';
    const lightGrayColor = localStorage.getItem('lightGrayColor') || '#f3f4f6';

    document.getElementById('primaryColor').value = primaryColor;
    document.getElementById('primaryColorText').value = primaryColor;
    document.getElementById('secondaryColor').value = secondaryColor;
    document.getElementById('secondaryColorText').value = secondaryColor;
    document.getElementById('darkGrayColor').value = darkGrayColor;
    document.getElementById('darkGrayColorText').value = darkGrayColor;
    document.getElementById('lightGrayColor').value = lightGrayColor;
    document.getElementById('lightGrayColorText').value = lightGrayColor;

    // Load logo
    const logo = localStorage.getItem('logo');
    if (logo) {
        document.getElementById('logoImg').src = logo;
        document.getElementById('logoImg').style.display = 'block';
        document.getElementById('logoPlaceholder').style.display = 'none';
    }

    // Load CTA buttons
    document.getElementById('cta1Text').value = localStorage.getItem('cta1Text') || 'Request a Quote';
    document.getElementById('cta2Text').value = localStorage.getItem('cta2Text') || 'Contact Us';
    document.getElementById('cta3Text').value = localStorage.getItem('cta3Text') || 'Book a Service';
}

function saveCompanyInfo() {
    localStorage.setItem('companyName', document.getElementById('companyName').value);
    localStorage.setItem('tagline', document.getElementById('tagline').value);
    localStorage.setItem('heroHeadline', document.getElementById('heroHeadline').value);
    localStorage.setItem('heroSubtitle', document.getElementById('heroSubtitle').value);
    localStorage.setItem('aboutText', document.getElementById('aboutText').value);
    
    updateLastModified();
    showAlert('Company information saved!', 'success');
    syncToWebsite();
}

function saveContactInfo() {
    localStorage.setItem('phone', document.getElementById('phone').value);
    localStorage.setItem('whatsapp', document.getElementById('whatsapp').value);
    localStorage.setItem('email', document.getElementById('email').value);
    localStorage.setItem('address', document.getElementById('address').value);
    localStorage.setItem('serviceAreas', document.getElementById('serviceAreas').value);
    
    updateLastModified();
    showAlert('Contact information saved!', 'success');
    syncToWebsite();
}

function saveBranding() {
    localStorage.setItem('primaryColor', document.getElementById('primaryColor').value);
    localStorage.setItem('secondaryColor', document.getElementById('secondaryColor').value);
    localStorage.setItem('darkGrayColor', document.getElementById('darkGrayColor').value);
    localStorage.setItem('lightGrayColor', document.getElementById('lightGrayColor').value);
    
    updateLastModified();
    showAlert('Branding saved!', 'success');
    syncToWebsite();
}

function saveHeroSettings() {
    localStorage.setItem('cta1Text', document.getElementById('cta1Text').value);
    localStorage.setItem('cta2Text', document.getElementById('cta2Text').value);
    localStorage.setItem('cta3Text', document.getElementById('cta3Text').value);
    
    updateLastModified();
    showAlert('Hero settings saved!', 'success');
    syncToWebsite();
}

function saveSettings() {
    const newPassword = document.getElementById('adminPassword').value;
    if (newPassword) {
        // In production, this should be sent to a secure backend
        localStorage.setItem('adminPasswordChanged', 'true');
        showAlert('Password updated!', 'success');
    }
    
    showAlert('Settings saved!', 'success');
}

function saveAllData() {
    saveCompanyInfo();
    saveContactInfo();
    saveBranding();
    saveHeroSettings();
    loadServices();
    loadTestimonials();
    updateDashboard();
}

// =============================
// COLOR SYNC
// =============================

function syncColorInputs(e) {
    const colorInput = e.target;
    const value = colorInput.value;
    
    if (colorInput.id === 'primaryColor') {
        document.getElementById('primaryColorText').value = value;
    } else if (colorInput.id === 'secondaryColor') {
        document.getElementById('secondaryColorText').value = value;
    } else if (colorInput.id === 'darkGrayColor') {
        document.getElementById('darkGrayColorText').value = value;
    } else if (colorInput.id === 'lightGrayColor') {
        document.getElementById('lightGrayColorText').value = value;
    }
}

// =============================
// FILE UPLOADS
// =============================

function handleLogoUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const logoData = event.target.result;
            localStorage.setItem('logo', logoData);
            document.getElementById('logoImg').src = logoData;
            document.getElementById('logoImg').style.display = 'block';
            document.getElementById('logoPlaceholder').style.display = 'none';
            showAlert('Logo uploaded successfully!', 'success');
        };
        reader.readAsDataURL(file);
    }
}

function handleHeroImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            localStorage.setItem('heroImage', event.target.result);
            showAlert('Hero image uploaded successfully!', 'success');
        };
        reader.readAsDataURL(file);
    }
}

// =============================
// SERVICES MANAGEMENT
// =============================

function loadServices() {
    const services = JSON.parse(localStorage.getItem('services') || '[]');
    const servicesList = document.getElementById('servicesList');
    servicesList.innerHTML = '';

    if (services.length === 0) {
        servicesList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #6b7280;">No services added yet. Click "Add New Service" to get started.</p>';
        return;
    }

    services.forEach((service, index) => {
        const serviceItem = document.createElement('div');
        serviceItem.className = 'service-item';
        serviceItem.innerHTML = `
            <h4>${service.icon} ${service.name}</h4>
            <p><strong>Category:</strong> ${service.category}</p>
            <p>${service.description}</p>
            <div class="item-actions">
                <button class="edit-btn" onclick="editService(${index})">✏️ Edit</button>
                <button class="delete-btn" onclick="deleteService(${index})">🗑️ Delete</button>
            </div>
        `;
        servicesList.appendChild(serviceItem);
    });

    updateDashboard();
}

function openAddServiceModal() {
    currentEditingService = null;
    document.getElementById('serviceIcon').value = '⚡';
    document.getElementById('serviceName').value = '';
    document.getElementById('serviceDescription').value = '';
    document.getElementById('serviceCategory').value = 'electrical';
    document.getElementById('serviceModal').style.display = 'flex';
}

function editService(index) {
    const services = JSON.parse(localStorage.getItem('services') || '[]');
    const service = services[index];
    
    currentEditingService = index;
    document.getElementById('serviceIcon').value = service.icon;
    document.getElementById('serviceName').value = service.name;
    document.getElementById('serviceDescription').value = service.description;
    document.getElementById('serviceCategory').value = service.category;
    document.getElementById('serviceModal').style.display = 'flex';
}

function saveService() {
    const icon = document.getElementById('serviceIcon').value;
    const name = document.getElementById('serviceName').value;
    const description = document.getElementById('serviceDescription').value;
    const category = document.getElementById('serviceCategory').value;

    if (!name || !description) {
        showAlert('Please fill in all fields', 'error');
        return;
    }

    let services = JSON.parse(localStorage.getItem('services') || '[]');

    if (currentEditingService !== null) {
        services[currentEditingService] = { icon, name, description, category };
    } else {
        services.push({ icon, name, description, category });
    }

    localStorage.setItem('services', JSON.stringify(services));
    closeModal('serviceModal');
    loadServices();
    updateLastModified();
    showAlert('Service saved successfully!', 'success');
    syncToWebsite();
}

function deleteService(index) {
    if (confirm('Are you sure you want to delete this service?')) {
        let services = JSON.parse(localStorage.getItem('services') || '[]');
        services.splice(index, 1);
        localStorage.setItem('services', JSON.stringify(services));
        loadServices();
        updateLastModified();
        showAlert('Service deleted', 'success');
        syncToWebsite();
    }
}

// =============================
// TESTIMONIALS MANAGEMENT
// =============================

function loadTestimonials() {
    const testimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');
    const testimonialsList = document.getElementById('testimonialsList');
    testimonialsList.innerHTML = '';

    if (testimonials.length === 0) {
        testimonialsList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #6b7280;">No testimonials added yet. Click "Add New Testimonial" to get started.</p>';
        return;
    }

    testimonials.forEach((testimonial, index) => {
        const testimonialItem = document.createElement('div');
        testimonialItem.className = 'testimonial-item';
        const stars = '⭐'.repeat(testimonial.rating);
        testimonialItem.innerHTML = `
            <h4>${testimonial.name}</h4>
            <p><strong>${testimonial.title}</strong></p>
            <p>"${testimonial.text}"</p>
            <p>${stars}</p>
            <div class="item-actions">
                <button class="edit-btn" onclick="editTestimonial(${index})">✏️ Edit</button>
                <button class="delete-btn" onclick="deleteTestimonial(${index})">🗑️ Delete</button>
            </div>
        `;
        testimonialsList.appendChild(testimonialItem);
    });

    updateDashboard();
}

function openAddTestimonialModal() {
    currentEditingTestimonial = null;
    document.getElementById('testimonialName').value = '';
    document.getElementById('testimonialTitle').value = '';
    document.getElementById('testimonialText').value = '';
    document.getElementById('testimonialRating').value = '5';
    document.getElementById('testimonialModal').style.display = 'flex';
}

function editTestimonial(index) {
    const testimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');
    const testimonial = testimonials[index];
    
    currentEditingTestimonial = index;
    document.getElementById('testimonialName').value = testimonial.name;
    document.getElementById('testimonialTitle').value = testimonial.title;
    document.getElementById('testimonialText').value = testimonial.text;
    document.getElementById('testimonialRating').value = testimonial.rating;
    document.getElementById('testimonialModal').style.display = 'flex';
}

function saveTestimonial() {
    const name = document.getElementById('testimonialName').value;
    const title = document.getElementById('testimonialTitle').value;
    const text = document.getElementById('testimonialText').value;
    const rating = parseInt(document.getElementById('testimonialRating').value);

    if (!name || !title || !text) {
        showAlert('Please fill in all fields', 'error');
        return;
    }

    let testimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');

    if (currentEditingTestimonial !== null) {
        testimonials[currentEditingTestimonial] = { name, title, text, rating };
    } else {
        testimonials.push({ name, title, text, rating });
    }

    localStorage.setItem('testimonials', JSON.stringify(testimonials));
    closeModal('testimonialModal');
    loadTestimonials();
    updateLastModified();
    showAlert('Testimonial saved successfully!', 'success');
    syncToWebsite();
}

function deleteTestimonial(index) {
    if (confirm('Are you sure you want to delete this testimonial?')) {
        let testimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');
        testimonials.splice(index, 1);
        localStorage.setItem('testimonials', JSON.stringify(testimonials));
        loadTestimonials();
        updateLastModified();
        showAlert('Testimonial deleted', 'success');
        syncToWebsite();
    }
}

// =============================
// DASHBOARD
// =============================

function updateDashboard() {
    const services = JSON.parse(localStorage.getItem('services') || '[]');
    const testimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');
    const lastUpdated = localStorage.getItem('lastUpdated') || 'Never';

    document.getElementById('serviceCount').textContent = services.length;
    document.getElementById('testimonialCount').textContent = testimonials.length;
    document.getElementById('lastUpdated').textContent = lastUpdated;
}

function updateLastModified() {
    const now = new Date();
    const formatted = now.toLocaleString();
    localStorage.setItem('lastUpdated', formatted);
}

// =============================
// MODALS
// =============================

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});

// =============================
// IMPORT/EXPORT
// =============================

function exportData() {
    const data = {
        company: {
            name: localStorage.getItem('companyName'),
            tagline: localStorage.getItem('tagline'),
            heroHeadline: localStorage.getItem('heroHeadline'),
            heroSubtitle: localStorage.getItem('heroSubtitle'),
            aboutText: localStorage.getItem('aboutText')
        },
        contact: {
            phone: localStorage.getItem('phone'),
            whatsapp: localStorage.getItem('whatsapp'),
            email: localStorage.getItem('email'),
            address: localStorage.getItem('address'),
            serviceAreas: localStorage.getItem('serviceAreas')
        },
        branding: {
            primaryColor: localStorage.getItem('primaryColor'),
            secondaryColor: localStorage.getItem('secondaryColor'),
            darkGrayColor: localStorage.getItem('darkGrayColor'),
            lightGrayColor: localStorage.getItem('lightGrayColor')
        },
        services: JSON.parse(localStorage.getItem('services') || '[]'),
        testimonials: JSON.parse(localStorage.getItem('testimonials') || '[]'),
        exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `easy-life-backup-${new Date().getTime()}.json`;
    link.click();
    
    showAlert('Data exported successfully!', 'success');
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            // Import company data
            if (data.company) {
                localStorage.setItem('companyName', data.company.name || 'Easy Life Electrician Consult');
                localStorage.setItem('tagline', data.company.tagline || '');
                localStorage.setItem('heroHeadline', data.company.heroHeadline || '');
                localStorage.setItem('heroSubtitle', data.company.heroSubtitle || '');
                localStorage.setItem('aboutText', data.company.aboutText || '');
            }

            // Import contact data
            if (data.contact) {
                localStorage.setItem('phone', data.contact.phone || '');
                localStorage.setItem('whatsapp', data.contact.whatsapp || '');
                localStorage.setItem('email', data.contact.email || '');
                localStorage.setItem('address', data.contact.address || '');
                localStorage.setItem('serviceAreas', data.contact.serviceAreas || '');
            }

            // Import branding
            if (data.branding) {
                localStorage.setItem('primaryColor', data.branding.primaryColor || '#1e3a8a');
                localStorage.setItem('secondaryColor', data.branding.secondaryColor || '#fbbf24');
                localStorage.setItem('darkGrayColor', data.branding.darkGrayColor || '#374151');
                localStorage.setItem('lightGrayColor', data.branding.lightGrayColor || '#f3f4f6');
            }

            // Import services and testimonials
            if (data.services) {
                localStorage.setItem('services', JSON.stringify(data.services));
            }
            if (data.testimonials) {
                localStorage.setItem('testimonials', JSON.stringify(data.testimonials));
            }

            loadAllData();
            loadServices();
            loadTestimonials();
            updateDashboard();
            updateLastModified();
            showAlert('Data imported successfully!', 'success');
            syncToWebsite();
        } catch (error) {
            showAlert('Error importing data. Please check the file format.', 'error');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

// =============================
// RESET
// =============================

function resetToDefaults() {
    localStorage.clear();
    location.reload();
}

// =============================
// UTILITIES
// =============================

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    const mainContent = document.querySelector('.admin-main');
    mainContent.insertBefore(alertDiv, mainContent.firstChild);

    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

function previewSite() {
    window.open('index.html', '_blank');
}

function syncToWebsite() {
    // This would sync changes to the main website if both are on the same server
    // For now, just update localStorage which the main site can read
    localStorage.setItem('adminDataUpdated', new Date().getTime());
}

function clearAllForms() {
    document.querySelectorAll('input, textarea, select').forEach(field => {
        if (field.type !== 'password') {
            field.value = '';
        }
    });
}

console.log('Admin Panel Initialized');
