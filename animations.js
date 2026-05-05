// animations.js - Intersection Observers, Counters, and Typing Effects

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Scroll Reveal Animation using IntersectionObserver ---
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            const el = entry.target;
            const delay = el.getAttribute('data-delay') || 0;
            
            // Apply delay if specified
            if (delay) {
                setTimeout(() => {
                    el.classList.add('revealed');
                }, delay);
            } else {
                el.classList.add('revealed');
            }
            
            // Stop observing once revealed to animate only once
            observer.unobserve(el);
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- 2. Stat Counters Animation ---
    const statCounters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;
    
    const animateCounters = () => {
        statCounters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // ms
            const step = target / (duration / 16); // 60fps
            
            let current = 0;
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            
            updateCounter();
        });
    };
    
    // Observer specifically for the hero section to trigger counters
    const heroSection = document.getElementById('home');
    if (heroSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !countersAnimated) {
                animateCounters();
                countersAnimated = true;
            }
        }, { threshold: 0.5 });
        
        statsObserver.observe(heroSection);
    }

    // --- 3. Progress Bar Fill Animation ---
    const progressBars = document.querySelectorAll('.progress');
    let progressAnimated = false;
    
    const animateProgressBars = () => {
        progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            // Give a slight delay for better visual effect when scrolling down
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    };
    
    // Observer for skills section
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !progressAnimated) {
                animateProgressBars();
                progressAnimated = true;
            }
        }, { threshold: 0.2 });
        
        skillsObserver.observe(skillsSection);
    }

    // --- 4. Typing Effect for Hero Tagline ---
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const textToType = "Web Creator | Digital Designer | Creative Builder";
        typingElement.innerText = ''; // Clear initial text
        let charIndex = 0;
        let isDeleting = false;
        
        // Simple type once effect
        const typeEffect = () => {
            if (charIndex < textToType.length) {
                typingElement.innerText += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeEffect, 100); // Typing speed
            } else {
                // Done typing, keep the blinking cursor
                typingElement.style.borderRight = '3px solid var(--accent-primary)';
            }
        };
        
        // Start typing after a short delay
        setTimeout(typeEffect, 1000);
    }
});
