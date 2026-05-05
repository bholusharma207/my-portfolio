// main.js - Core logic, navigation, and form handling

document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    const hamburgerIcon = hamburger.querySelector('i');

    const toggleMenu = () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            hamburgerIcon.classList.remove('fa-bars');
            hamburgerIcon.classList.add('fa-times');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        } else {
            hamburgerIcon.classList.remove('fa-times');
            hamburgerIcon.classList.add('fa-bars');
            document.body.style.overflow = '';
        }
    };

    hamburger.addEventListener('click', toggleMenu);

    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // --- Active Menu Highlighting ---
    const sections = document.querySelectorAll('section');
    
    const updateActiveLink = () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Add slight offset for better UX
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink);
    
    // --- Smooth Scrolling ---
    // Smooth scrolling is handled mostly by CSS scroll-behavior, 
    // but this ensures precise offsets if needed in JS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Contact Form Handling ---
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.querySelector('.form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Simulate API call / Form submission delay
            setTimeout(() => {
                formMessage.textContent = 'Message sent successfully! I will get back to you soon.';
                formMessage.className = 'form-message success';
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Clear message after 5 seconds
                setTimeout(() => {
                    formMessage.textContent = '';
                    formMessage.className = 'form-message';
                }, 5000);
            }, 1500);
        });
    }
});
