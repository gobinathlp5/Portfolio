document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Custom Cursor Logic ---
    const cursor = document.querySelector('.cursor');
    window.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const hoverTargets = document.querySelectorAll('.link-hover');
    hoverTargets.forEach(target => {
        target.addEventListener('mouseover', () => {
            cursor.classList.add('cursor-pointer');
        });
        target.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-pointer');
        });
    });

    // --- 2. Typed.js for Hero Headline ---
    const options = {
        strings: ['Embedded and IoT Enthusiast.', 'Creative Problem-Solver.', 'Web Developer.'],
        typeSpeed: 60,
        backSpeed: 30,
        backDelay: 1500,
        loop: true
    };
    const typed = new Typed('#typed-headline', options);

    // --- 3. Intersection Observer for Scroll Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // --- 4. Dark Mode Toggle Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleIcon = document.getElementById('theme-toggle-icon');
    const currentTheme = localStorage.getItem('theme');

    // Function to set the theme and icon
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (theme === 'dark') {
            themeToggleIcon.classList.remove('fa-moon');
            themeToggleIcon.classList.add('fa-sun');
        } else {
            themeToggleIcon.classList.remove('fa-sun');
            themeToggleIcon.classList.add('fa-moon');
        }
    };

    // Check for saved theme in localStorage or user's OS preference
    if (currentTheme) {
        setTheme(currentTheme);
    } else {
        const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(userPrefersDark ? 'dark' : 'light');
    }

    // Add click event listener to the toggle button
    themeToggleBtn.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
    
    // --- 5. Mobile Navigation Logic ---
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const hamburgerIcon = hamburgerMenu.querySelector('i');
    const navLinksList = navLinks.querySelectorAll('a');

    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const isActive = navLinks.classList.contains('active');
        hamburgerIcon.classList.toggle('fa-xmark', isActive);
        hamburgerIcon.classList.toggle('fa-bars', !isActive);
    });

    // Close menu when a link is clicked
    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburgerIcon.classList.remove('fa-xmark');
                hamburgerIcon.classList.add('fa-bars');
            }
        });
    });

    // --- 6. Proximity Card Hover Effect ---
    const grids = document.querySelectorAll('.project-grid, .achievements-grid, .soft-skills-grid, .skills-categories');
    grids.forEach(grid => {
        grid.addEventListener('mousemove', e => {
            const cards = grid.querySelectorAll('.project-card, .achievement-card, .soft-skill-card, .skill-category');
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--x', `${x}px`);
                card.style.setProperty('--y', `${y}px`);
            });
        });
    });

    // --- 7. Back to Top Button Logic ---
    const backToTopBtn = document.getElementById('back-to-top-btn');

    window.addEventListener('scroll', () => {
        // Show the button after scrolling 400px
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
});

// --- 8. Preloader Logic ---
// This runs when the entire page is fully loaded, including images and stylesheets.
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('hidden');
});