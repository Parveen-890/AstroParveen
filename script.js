// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initFAQ();
    initForms();
    initSmoothScrolling();
    initAnimations();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Active navigation highlighting - moved to global scope
    window.updateActiveNav = function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };

    // Update on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Mobile menu toggle (if needed)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
}

// FAQ functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Deployment verification
console.log('🔧 Script.js loaded - Version: 2024-01-15-v4.0-COMPLETE with universal email template');
console.log('📋 Form debugging enabled - Check console for detailed validation logs');

// Form handling
function initForms() {
    // Consultation form
    const consultationForm = document.getElementById('consultationForm');
    if (consultationForm) {
        console.log('Consultation form found and initialized'); // Debug log
        consultationForm.addEventListener('submit', handleConsultationForm);
    } else {
        console.log('Consultation form not found'); // Debug log
    }
    
    // Contact form removed - using consultation form instead
}


function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call (replace with actual implementation)
    setTimeout(() => {
        showMessage('success', 'Thank you for your message! We will get back to you soon.');
        e.target.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function showMessage(type, message) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.success-message, .error-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.textContent = message;
    
    // Insert after the form
    const forms = document.querySelectorAll('form');
    const lastForm = forms[forms.length - 1];
    lastForm.parentNode.insertBefore(messageDiv, lastForm.nextSibling);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animations and interactions
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.course-card, .certificate-card, .credential, .about-content, .consultation-content, .contact-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero::before');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Course enrollment handling
function enrollInCourse(courseId) {
    // Get course details
    const courseCard = document.getElementById(courseId);
    const courseTitle = courseCard.querySelector('h3').textContent;
    const coursePrice = courseCard.querySelector('.price').textContent;
    
    // Create enrollment modal or redirect
    const confirmEnrollment = confirm(`Enroll in ${courseTitle} for ${coursePrice}?`);
    
    if (confirmEnrollment) {
        // Redirect to payment or enrollment form
        // This would typically redirect to a payment gateway or enrollment form
        window.location.href = `#enroll?course=${encodeURIComponent(courseId)}`;
    }
}

// WhatsApp integration
function openWhatsApp(message = '') {
    const phoneNumber = '919813902644';
    const defaultMessage = message || 'Hello! I am interested in learning Vedic Astrology. Could you please provide more information about your courses?';
    const encodedMessage = encodeURIComponent(defaultMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}

// Course-specific WhatsApp messages
function contactForCourse(courseName) {
    const message = `Hello! I am interested in the ${courseName} course. Could you please provide more details about enrollment and fees?`;
    openWhatsApp(message);
}

// Service-specific WhatsApp messages
function contactForService(serviceName) {
    const message = `Hello! I am interested in booking a ${serviceName} consultation. Could you please provide more details about the service and availability?`;
    openWhatsApp(message);
}

// Course data for enrollment modal
const courseData = {
    'basics-course': {
        title: 'Basics of Astrology',
        price: '₹1,500',
        priceType: 'One-time payment'
    },
    'multi-course': {
        title: 'Multi Astro Course',
        price: '₹2,000/month',
        priceType: 'Comprehensive Package'
    },
    'bnn-course': {
        title: 'BNN33 (Bhargu Nandi Nadi)',
        price: '₹12,300',
        priceType: 'One-time payment'
    },
    'zodiac-course': {
        title: 'Secrets of Zodiac',
        price: '₹5,100',
        priceType: 'One-time payment'
    },
    'graphology-course': {
        title: 'Graphology',
        price: '₹5,100',
        priceType: 'One-time payment'
    }
};

// Enrollment modal functions
function openEnrollmentModal(courseId) {
    const modal = document.getElementById('enrollmentModal');
    const courseInfo = document.getElementById('courseInfo');
    const selectedCourse = document.getElementById('selectedCourse');
    
    // Populate course information
    const course = courseData[courseId];
    if (course) {
        courseInfo.innerHTML = `
            <h3>${course.title}</h3>
            <div class="price">${course.price}</div>
            <div class="price-type">${course.priceType}</div>
        `;
        selectedCourse.value = courseId;
    }
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeEnrollmentModal() {
    const modal = document.getElementById('enrollmentModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Reset form
    document.getElementById('enrollmentForm').reset();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('enrollmentModal');
    if (event.target === modal) {
        closeEnrollmentModal();
    }
}

// Handle enrollment form submission
document.addEventListener('DOMContentLoaded', function() {
    const enrollmentForm = document.getElementById('enrollmentForm');
    if (enrollmentForm) {
        enrollmentForm.addEventListener('submit', handleEnrollmentForm);
    }
    
    // Handle payment method selection
    const paymentSelect = document.getElementById('enrollPayment');
    const upiDetails = document.getElementById('upiDetails');
    
    if (paymentSelect && upiDetails) {
        paymentSelect.addEventListener('change', function() {
            if (this.value === 'upi') {
                upiDetails.style.display = 'block';
            } else {
                upiDetails.style.display = 'none';
            }
        });
    }
});

function handleEnrollmentForm(e) {
    e.preventDefault();
    
    if (!validateForm(e.target)) {
        showMessage('error', 'Please fill in all required fields correctly.');
        return;
    }
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading"></span> Submitting...';
    submitBtn.disabled = true;
    
    // Simulate API call (replace with actual implementation)
    setTimeout(() => {
        showMessage('success', 'Thank you for your enrollment! We will contact you within 24 hours with payment details and course schedule.');
        closeEnrollmentModal();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Add click handlers for WhatsApp buttons
document.addEventListener('DOMContentLoaded', function() {
    const whatsappButtons = document.querySelectorAll('.whatsapp, .whatsapp-btn a, .whatsapp-float-btn');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openWhatsApp();
        });
    });
});

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    console.log('Validating form with', inputs.length, 'required fields');
    
    inputs.forEach(input => {
        console.log('Checking field:', input.name, 'Value:', input.value);
        if (!input.value.trim()) {
            console.log('❌ Field failed validation:', input.name, 'is empty');
            input.classList.add('error');
            isValid = false;
        } else {
            console.log('✅ Field passed basic validation:', input.name);
            input.classList.remove('error');
        }
        
        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                console.log('❌ Email validation failed:', input.value);
                input.classList.add('error');
                isValid = false;
            } else {
                console.log('✅ Email validation passed:', input.value);
            }
        }
        
        // Phone validation
        if (input.type === 'tel' && input.value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            const cleanPhone = input.value.replace(/\s/g, '');
            if (!phoneRegex.test(cleanPhone)) {
                console.log('❌ Phone validation failed:', input.value, 'Clean:', cleanPhone);
                input.classList.add('error');
                isValid = false;
            } else {
                console.log('✅ Phone validation passed:', input.value);
            }
        }
    });
    
    console.log('Form validation result:', isValid);
    return isValid;
}

// Add CSS for error states
const errorStyles = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
`;

// Inject error styles
const styleSheet = document.createElement('style');
styleSheet.textContent = errorStyles;
document.head.appendChild(styleSheet);

// Handle consultation form submission
function handleConsultationForm(e) {
    e.preventDefault();
    console.log('Consultation form submitted'); // Debug log
    
    const formData = new FormData(e.target);
    console.log('Form data:', formData);
    console.log('Form data entries:', Array.from(formData.entries()));
    
    // Debug: Check individual form fields
    const form = e.target;
    const name = form.querySelector('[name="name"]').value;
    const email = form.querySelector('[name="email"]').value;
    const phone = form.querySelector('[name="phone"]').value;
    const service = form.querySelector('[name="service"]').value;
    
    console.log('Individual field values:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Service:', service);
    
    if (!validateForm(e.target)) {
        showMessage('error', 'Please fill in all required fields correctly.');
        return;
    }
    
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading"></span> Booking...';
    submitBtn.disabled = true;
    
            // EmailJS configuration - Universal template approach
            const emailParams = {
                // Template metadata
                form_type: 'Free Astrology Consultation',
                submission_date: new Date().toLocaleString(),
                from_email: data.email,
                
                // All form fields (will be displayed dynamically in template)
                name: data.name || '',
                email: data.email || '',
                phone: data.phone || '',
                birthDate: data.birthDate || '',
                birthTime: data.birthTime || '',
                birthPlace: data.birthPlace || '',
                service: data.service || '',
                message: data.message || '',
                
                // Additional metadata
                total_fields: Object.keys(data).length,
                filled_fields: Object.values(data).filter(value => value && value.trim()).length
            };
            
            // Debug: Log email parameters
            console.log('EmailJS Parameters:', emailParams);
            console.log('Service ID: service_67fctdj');
            console.log('Template ID: template_gsdp46s');
            
            // Send email using EmailJS
            emailjs.send('service_67fctdj', 'template_gsdp46s', emailParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            console.log('Full response:', response);
            showMessage('success', 'Thank you! Your free astrology consultation request has been submitted. We will contact you within 24 hours to schedule your session.');
            e.target.reset();
        }, function(error) {
            console.log('FAILED...', error);
            console.log('Error details:', error);
            showMessage('error', 'Sorry, there was an error sending your request. Please try again or contact us directly via WhatsApp.');
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
}

function handleContactForm(e) {
    e.preventDefault();
    
    if (!validateForm(e.target)) {
        showMessage('error', 'Please fill in all required fields correctly.');
        return;
    }
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call (replace with actual implementation)
    setTimeout(() => {
        showMessage('success', 'Thank you for your message! We will get back to you soon.');
        e.target.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Add animation classes to CSS
const animationStyles = `
    .course-card,
    .certificate-card,
    .credential,
    .about-content,
    .consultation-content,
    .contact-content {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;

// Inject animation styles
const animationStyleSheet = document.createElement('style');
animationStyleSheet.textContent = animationStyles;
document.head.appendChild(animationStyleSheet);

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

// Optimized scroll handler
const debouncedUpdateActiveNav = debounce(function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}, 100);

// Replace the scroll event listener (only if updateActiveNav exists)
if (typeof updateActiveNav !== 'undefined') {
    window.removeEventListener('scroll', updateActiveNav);
}
window.addEventListener('scroll', debouncedUpdateActiveNav);

// Course pricing calculator (if needed)
function calculateCoursePrice(courseId, paymentPlan = 'full') {
    const coursePrices = {
        'basics-course': { full: 1500, monthly: 1500 },
        'advanced-course': { full: 6000, monthly: 2000 },
        'multi-course': { full: 7500, monthly: 2500 },
        'bnn-course': { full: 12300, monthly: 12300 },
        'zodiac-course': { full: 5100, monthly: 5100 }
    };
    
    return coursePrices[courseId]?.[paymentPlan] || 0;
}

// Export functions for external use (if needed)
window.AstroPraveen = {
    enrollInCourse,
    openWhatsApp,
    contactForCourse,
    calculateCoursePrice
};
