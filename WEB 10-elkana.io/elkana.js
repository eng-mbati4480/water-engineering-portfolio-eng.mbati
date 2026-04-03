// Smooth scrolling for navigation links
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

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

function toggleMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    const isExpanded = hamburger.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded);
}

hamburger.addEventListener('click', toggleMenu);

// Keyboard support for hamburger
hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const isClickInsideNav = navMenu.contains(e.target) || hamburger.contains(e.target);
    if (!isClickInsideNav && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const darkMode = document.body.classList.contains('dark-mode');
    if (window.scrollY > 50) {
        if (darkMode) {
            navbar.style.background = 'rgba(28, 36, 49, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        if (darkMode) {
            navbar.style.background = 'rgba(28, 36, 49, 0.7)';
        } else {
            navbar.style.background = '#fff';
        }
        navbar.style.backdropFilter = 'none';
    }
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Basic validation
    if (!data.name || !data.email || !data.subject || !data.message) {
        alert('Please fill in all fields');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Terms agreement
    const agreeTerms = document.getElementById('agreeTerms');
    if (!agreeTerms.checked) {
        alert('Please agree to the terms and conditions before submitting.');
        return;
    }

    // In a real application, you would send this data to a server
    // For now, we'll just show a success message
    alert('Thank you for your message! I will get back to you soon.');

    // Reset form
    contactForm.reset();
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.expertise-card, .project-card, .timeline-item').forEach(el => {
    observer.observe(el);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .expertise-card, .project-card, .timeline-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .expertise-card.animate, .project-card.animate, .timeline-item.animate {
        opacity: 1;
        transform: translateY(0);
    }

    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 70px;
        left: 0;
        width: 100%;
        background: white;
        padding: 20px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }

    @media (min-width: 769px) {
        .nav-menu.active {
            display: flex !important;
            flex-direction: row !important;
            position: static !important;
            background: transparent !important;
            padding: 0 !important;
            box-shadow: none !important;
        }
    }
`;
document.head.appendChild(style);

// Video background handling
const heroVideo = document.querySelector('.hero-video');
const heroSection = document.querySelector('.hero');

if (heroVideo) {
    // Add loading class initially
    heroVideo.classList.add('loading');

    heroVideo.addEventListener('loadeddata', () => {
        console.log('Video loaded successfully');
        heroVideo.classList.remove('loading');
        heroVideo.classList.add('loaded');
    });

    heroVideo.addEventListener('error', () => {
        console.log('Video failed to load, using fallback background');
        // Fallback to gradient background if video fails
        heroSection.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        heroVideo.style.display = 'none';
    });

    // Pause video on mobile for better performance
    function handleVideoPlayback() {
        if (window.innerWidth <= 768) {
            heroVideo.pause();
            heroVideo.style.display = 'none';
            heroSection.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        } else {
            // Only try to play if video is loaded
            if (heroVideo.readyState >= 3) {
                heroVideo.play().catch(() => {
                    // Autoplay failed, show fallback
                    heroSection.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                    heroVideo.style.display = 'none';
                });
            }
            heroVideo.style.display = 'block';
        }
    }

    // Check on load and resize
    window.addEventListener('load', handleVideoPlayback);
    window.addEventListener('resize', handleVideoPlayback);
}

// Footer video background handling
const footerVideo = document.querySelector('.footer-video');
const footerSection = document.querySelector('.footer');

if (footerVideo) {
    // Add loading class initially
    footerVideo.classList.add('loading');

    footerVideo.addEventListener('loadeddata', () => {
        console.log('Footer video loaded successfully');
        footerVideo.classList.remove('loading');
        footerVideo.classList.add('loaded');
    });

    footerVideo.addEventListener('error', () => {
        console.log('Footer video failed to load, using fallback background');
        // Fallback to solid color background if video fails
        footerSection.style.background = '#2c3e50';
        footerVideo.style.display = 'none';
    });

    // Pause video on mobile for better performance
    function handleFooterVideoPlayback() {
        if (window.innerWidth <= 768) {
            footerVideo.pause();
            footerVideo.style.display = 'none';
        } else {
            // Only try to play if video is loaded
            if (footerVideo.readyState >= 3) {
                footerVideo.play().catch(() => {
                    // Autoplay failed, show fallback
                    footerVideo.style.display = 'none';
                });
            }
            footerVideo.style.display = 'block';
        }
    }

    // Check on load and resize
    window.addEventListener('load', handleFooterVideoPlayback);
    window.addEventListener('resize', handleFooterVideoPlayback);
}

// Dark mode toggle + storage
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = 'Light Mode';
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.textContent = 'Dark Mode';
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
}

function loadTheme() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        applyTheme(storedTheme);
    } else if (prefersDarkScheme.matches) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }
}

if (themeToggle) {
    loadTheme();

    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-mode');
        const nextTheme = isDark ? 'light' : 'dark';
        applyTheme(nextTheme);
        localStorage.setItem('theme', nextTheme);
    });
}

// Floating welcome message animation control
const welcomeMessage = document.getElementById('welcomeMessage');
const closeWelcome = document.getElementById('closeWelcome');

function showWelcome() {
    if (welcomeMessage) {
        welcomeMessage.classList.add('show');
        setTimeout(() => {
            welcomeMessage.classList.remove('show');
        }, 6000);
    }
}

if (closeWelcome) {
    closeWelcome.addEventListener('click', () => {
        if (welcomeMessage) {
            welcomeMessage.classList.remove('show');
        }
    });
}

window.addEventListener('load', function() {
    setTimeout(showWelcome, 800);
});

// Footer WhatsApp CTA - trigger when footer comes into view
const footerWhatsapp = document.querySelector('.footer-whatsapp');
if (footerWhatsapp) {
    const footerObserverOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add highlight animation
                entry.target.style.animation = 'none';
                setTimeout(() => {
                    entry.target.style.animation = 'footerHighlight 0.6s ease';
                }, 10);
            }
        });
    }, footerObserverOptions);

    footerObserver.observe(footerWhatsapp);
}

// FAQ Accordion Functionality
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach((question) => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all other open items
        document.querySelectorAll('.faq-item.active').forEach((item) => {
            if (item !== faqItem) {
                item.classList.remove('active');
                item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            }
        });
        
        // Toggle current item
        faqItem.classList.toggle('active');
        question.setAttribute('aria-expanded', !isActive);
    });

    // Keyboard support for FAQ
    question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
        }
    });
});
