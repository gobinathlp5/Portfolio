document.addEventListener('DOMContentLoaded', () => {
    /**
     * Initializes the custom cursor functionality.
     */
    function initCursor() {
        const cursor = document.querySelector('.cursor');
        if (!cursor) return;

        window.addEventListener('mousemove', e => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        const hoverTargets = document.querySelectorAll('.link-hover');
        hoverTargets.forEach(target => {
            target.addEventListener('mouseover', () => cursor.classList.add('cursor-pointer'));
            target.addEventListener('mouseleave', () => cursor.classList.remove('cursor-pointer'));
        });
    }

    /**
     * Initializes the Typed.js animation for the hero headline.
     */
    function initTyped() {
        if (typeof Typed === 'undefined') {
            console.error('Typed.js library not found.');
            return;
        }
        const options = {
            strings: ['Embedded and IoT Enthusiast.', 'Creative Problem-Solver.', 'Web Developer.'],
            typeSpeed: 60,
            backSpeed: 30,
            backDelay: 1500,
            loop: true
        };
        new Typed('#typed-headline', options);
    }

    /**
     * Initializes the Intersection Observer for scroll-triggered animations.
     */
    function initScrollObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, { threshold: 0.1 });

        const hiddenElements = document.querySelectorAll('.hidden');
        hiddenElements.forEach((el) => observer.observe(el));
    }

    /**
     * Initializes the theme (dark/light mode) toggle functionality.
     */
    function initThemeToggle() {
        const themeToggleBtn = document.getElementById('theme-toggle');
        const themeToggleIcon = document.getElementById('theme-toggle-icon');
        if (!themeToggleBtn || !themeToggleIcon) return;

        const setTheme = (theme) => {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            themeToggleIcon.classList.toggle('fa-sun', theme === 'dark');
            themeToggleIcon.classList.toggle('fa-moon', theme !== 'dark');
        };

        themeToggleBtn.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });

        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            setTheme(currentTheme);
        } else {
            const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(userPrefersDark ? 'dark' : 'light');
        }
    }

    /**
     * Initializes the mobile navigation (hamburger menu).
     */
    function initMobileNav() {
        const hamburgerMenu = document.getElementById('hamburger-menu');
        const navLinks = document.querySelector('.nav-links');
        if (!hamburgerMenu || !navLinks) return;

        const hamburgerIcon = hamburgerMenu.querySelector('i');
        const navLinksList = navLinks.querySelectorAll('a');

        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isActive = navLinks.classList.contains('active');
            hamburgerIcon.classList.toggle('fa-xmark', isActive);
            hamburgerIcon.classList.toggle('fa-bars', !isActive);
        });

        navLinksList.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburgerIcon.classList.remove('fa-xmark');
                    hamburgerIcon.classList.add('fa-bars');
                }
            });
        });
    }

    /**
     * Initializes the proximity hover effect for cards.
     */
    function initProximityHover() {
        const grids = document.querySelectorAll('.project-grid, .achievements-grid, .skills-categories-grid');
        grids.forEach(grid => {
            grid.addEventListener('mousemove', e => {
                const cards = grid.querySelectorAll('.project-card, .achievement-card, .skill-category-card');
                cards.forEach(card => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    card.style.setProperty('--x', `${x}px`);
                    card.style.setProperty('--y', `${y}px`);
                });
            });
        });
    }

    /**
     * Initializes the "Back to Top" button functionality.
     */
    function initBackToTopButton() {
        const backToTopBtn = document.getElementById('back-to-top-btn');
        if (!backToTopBtn) return;

        window.addEventListener('scroll', () => {
            backToTopBtn.classList.toggle('show', window.scrollY > 400);
        });
    }

    /**
     * Initializes the preloader hiding mechanism.
     */
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('hidden');
        }
    }

    /**
     * Initializes the project filtering functionality.
     */
    function initProjectFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        if (!filterBtns.length || !projectCards.length) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filterValue === 'all' || filterValue === category) {
                        card.style.display = 'block';
                        // Small timeout to allow display:block to apply before opacity transition if needed
                        setTimeout(() => card.classList.remove('hidden'), 10);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    /**
     * Initializes the scroll spy to highlight active navigation links.
     */
    function initScrollSpy() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        window.addEventListener('scroll', () => {
            let current = '';
            const scrollPosition = window.scrollY + 100; // Offset for fixed header

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    }

    /**
     * Sets the current year in the footer.
     */
    function initDynamicYear() {
        const yearSpan = document.getElementById('copyright-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }

    // Initialize all functionalities
    initCursor();
    initTyped();
    initScrollObserver();
    initThemeToggle();
    initMobileNav();
    initProximityHover();
    initBackToTopButton();
    initProjectFilter();
    initScrollSpy();
    initDynamicYear();
});

// Run preloader logic after all page content (images, etc.) is loaded.
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hidden');
    }
});