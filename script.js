document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        navLinks.classList.toggle('open');
    });

    // Close mobile menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navToggle.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });

    // 2. Sticky Navbar and Active Link Updates on Scroll
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('.section');
    
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        let currentScroll = window.scrollY;

        // Active Link Update
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if(currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
                const currentId = section.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if(item.getAttribute('href') === `#${currentId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });

        // Optional: Hide navbar on scroll down, show on scroll up
        if(currentScroll > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // 3. Scroll Animations using IntersectionObserver
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of element is visible
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // 4. WhatsApp Redirect Logic
    const whatsappBtn = document.getElementById('whatsapp-btn');
    
    whatsappBtn.addEventListener('click', () => {
        // Pre-defined number and message
        const phoneNumber = '1234567890'; // Replace with actual number
        const message = 'Hello! I am interested in exploring some destinations and would like to know more about your services.';
        
        // Format the WhatsApp URL
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        // Open in new tab
        window.open(whatsappUrl, '_blank');
    });
});
