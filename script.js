// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

function toggleDarkMode() {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    localStorage.setItem('darkMode', isDark);
    darkModeToggle.innerHTML = isDark 
        ? '<i class="fas fa-sun text-yellow-400"></i>'
        : '<i class="fas fa-moon text-gray-600"></i>';
}

// Initialize dark mode
const savedDarkMode = localStorage.getItem('darkMode') === 'true';
if (savedDarkMode) body.classList.add('dark');
darkModeToggle.addEventListener('click', toggleDarkMode);

// Scroll Animations
function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach(el => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, { threshold: 0.1 });
        observer.observe(el);
    });
}
initAOS();

// Enhanced Form Validation
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    let isValid = true;

    // Validate name
    if (formData.get('name').trim().length < 3) {
        showError('name', 'Name must be at least 3 characters');
        isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.get('email'))) {
        showError('email', 'Please enter a valid email');
        isValid = false;
    }

    if (isValid) {
        // Submit form
        contactForm.reset();
        showSuccessMessage();
    }
});

function showError(field, message) {
    const input = document.querySelector(`[name="${field}"]`);
    const errorElement = document.createElement('p');
    errorElement.className = 'text-red-500 text-sm mt-1';
    errorElement.textContent = message;
    input.parentNode.appendChild(errorElement);
    input.classList.add('border-red-500');
}

// Project Filter
const projectFilters = document.querySelectorAll('.project-filter');
projectFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        const category = filter.dataset.filter;
        filterProjects(category);
    });
});

function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(project => {
        const projectCategory = project.dataset.category;
        if (category === 'all' || projectCategory === category) {
            project.classList.remove('hidden');
        } else {
            project.classList.add('hidden');
        }
    });
}

// Mobile Menu (enhanced)
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
});