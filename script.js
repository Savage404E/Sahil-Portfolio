// SAVAGE Portfolio JavaScript
class SavagePortfolio {
    constructor() {
        this.loadingScreen = document.getElementById('loadingScreen');
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.currentSection = 'home';
        
        this.init();
    }

    init() {
        this.setupLoadingScreen();
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupSkillAnimations();
        this.setupProjectHovers();
        this.setupTypingEffect();
    }

    setupLoadingScreen() {
        // Hide loading screen after page loads
        setTimeout(() => {
            this.loadingScreen.style.opacity = '0';
            setTimeout(() => {
                this.loadingScreen.style.display = 'none';
            }, 500);
        }, 2000);
    }

    setupNavigation() {
        // Mobile menu toggle
        this.navToggle.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.dataset.section;
                this.scrollToSection(targetSection);
                this.updateActiveLink(link);
                
                // Close mobile menu
                this.navMenu.classList.remove('active');
            });
        });

        // Handle button clicks that navigate to sections
        document.querySelectorAll('.btn[data-section]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = btn.dataset.section;
                this.scrollToSection(targetSection);
                this.updateActiveLink(document.querySelector(`.nav-link[data-section="${targetSection}"]`));
            });
        });

        // Scroll effect on navbar
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.navbar.style.background = 'rgba(10, 10, 10, 0.98)';
                this.navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
            } else {
                this.navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                this.navbar.style.boxShadow = 'none';
            }
        });
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.offsetTop - 80; // Account for navbar height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            this.currentSection = sectionId;
        }
    }

    updateActiveLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    setupScrollEffects() {
        // Intersection Observer for section animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const heroSection = document.querySelector('.hero-section');
            if (heroSection && scrolled < window.innerHeight) {
                heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }

    setupSkillAnimations() {
        const skillBars = document.querySelectorAll('.skill-bar');
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const skillLevel = skillBar.style.getPropertyValue('--skill-level');
                    skillBar.style.width = skillLevel;
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }

    setupProjectHovers() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addGlitchEffect(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeGlitchEffect(card);
            });
        });
    }

    addGlitchEffect(element) {
        element.style.animation = 'glitch 0.3s infinite';
    }

    removeGlitchEffect(element) {
        element.style.animation = '';
    }

    setupTypingEffect() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            this.createTypingEffect(heroTitle);
        }
    }

    createTypingEffect(element) {
        const text = element.textContent;
        element.textContent = '';
        let index = 0;

        const typeWriter = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        };

        setTimeout(typeWriter, 1000); // Start typing after loading screen
    }

    // Add some interactive effects
    addInteractiveEffects() {
        // Add cursor trail effect
        let cursorTrail = [];
        const maxTrailLength = 20;

        document.addEventListener('mousemove', (e) => {
            cursorTrail.push({
                x: e.clientX,
                y: e.clientY,
                id: Date.now()
            });

            if (cursorTrail.length > maxTrailLength) {
                cursorTrail.shift();
            }

            this.updateCursorTrail(cursorTrail);
        });
    }

    updateCursorTrail(trail) {
        // Remove old trail elements
        document.querySelectorAll('.cursor-trail').forEach(el => el.remove());

        // Create new trail elements
        trail.forEach((point, index) => {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.cssText = `
                position: fixed;
                left: ${point.x}px;
                top: ${point.y}px;
                width: 4px;
                height: 4px;
                background: var(--primary-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                opacity: ${index / trail.length * 0.5};
                transform: translate(-50%, -50%);
            `;
            document.body.appendChild(trail);

            // Fade out and remove
            setTimeout(() => {
                trail.style.opacity = '0';
                setTimeout(() => trail.remove(), 300);
            }, 100);
        });
    }

    // Add particle effects
    createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        document.body.appendChild(particlesContainer);

        // Create floating particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: var(--primary-color);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float-particle ${10 + Math.random() * 20}s linear infinite;
            `;
            particlesContainer.appendChild(particle);
        }
    }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1;
        transform: translateY(0);
        transition: all 0.8s ease;
    }
    
    section {
        opacity: 0;
        transform: translateY(50px);
    }
    
    @keyframes float-particle {
        0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
        }
    }
    
    .cursor-trail {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// Initialize the portfolio
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new SavagePortfolio();
    
    // Add some extra interactive features
    portfolio.addInteractiveEffects();
    portfolio.createParticles();
});

// Add some utility functions
const utils = {
    // Random color generator
    getRandomColor() {
        const colors = ['#00ff41', '#00cc33', '#ff0080', '#ff0040', '#00ff88'];
        return colors[Math.floor(Math.random() * colors.length)];
    },
    
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        document.querySelector('.nav-menu')?.classList.remove('active');
    }
});

// Add smooth reveal animations
window.addEventListener('load', () => {
    // Reveal elements with stagger effect
    const elements = document.querySelectorAll('.project-card, .skill-category, .stat-item, .contact-method');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});
