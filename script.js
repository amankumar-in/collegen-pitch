document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksArray = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    const slides = document.querySelectorAll('.slide');
    
    // Mobile navigation toggle
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinksArray.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    navLinksArray.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSlide = document.querySelector(targetId);
            
            if (targetSlide) {
                const offsetTop = targetSlide.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation link highlighting
    function updateActiveNavLink() {
        const scrollPos = window.scrollY + 100;
        
        slides.forEach(slide => {
            const slideTop = slide.offsetTop;
            const slideHeight = slide.offsetHeight;
            const slideId = slide.getAttribute('id');
            
            if (scrollPos >= slideTop && scrollPos < slideTop + slideHeight) {
                navLinksArray.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${slideId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Keyboard navigation for presentation mode
    let currentSlideIndex = 0;
    
    function scrollToSlide(index) {
        if (index >= 0 && index < slides.length) {
            const targetSlide = slides[index];
            const offsetTop = targetSlide.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            currentSlideIndex = index;
        }
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
            e.preventDefault();
            if (currentSlideIndex < slides.length - 1) {
                scrollToSlide(currentSlideIndex + 1);
            }
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            if (currentSlideIndex > 0) {
                scrollToSlide(currentSlideIndex - 1);
            }
        } else if (e.key === 'Home') {
            e.preventDefault();
            scrollToSlide(0);
        } else if (e.key === 'End') {
            e.preventDefault();
            scrollToSlide(slides.length - 1);
        }
    });
    
    // Update current slide index on scroll
    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY + 100;
        slides.forEach((slide, index) => {
            const slideTop = slide.offsetTop;
            const slideHeight = slide.offsetHeight;
            if (scrollPos >= slideTop && scrollPos < slideTop + slideHeight) {
                currentSlideIndex = index;
            }
        });
    });
    
    // CTA button functionality
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            alert('Thank you for your interest! Please contact us to schedule a pilot program discussion.');
        });
    }
    
    // Navigation buttons functionality
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    function updateNavButtons() {
        if (currentSlideIndex === 0) {
            prevBtn.disabled = true;
        } else {
            prevBtn.disabled = false;
        }
        
        if (currentSlideIndex === slides.length - 1) {
            nextBtn.disabled = true;
        } else {
            nextBtn.disabled = false;
        }
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentSlideIndex > 0) {
                scrollToSlide(currentSlideIndex - 1);
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentSlideIndex < slides.length - 1) {
                scrollToSlide(currentSlideIndex + 1);
            }
        });
    }
    
    // Update navigation buttons on scroll
    window.addEventListener('scroll', function() {
        updateNavButtons();
    });
    
    // Initial button state
    updateNavButtons();
    
    // Intersection Observer for animations
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
    
    // Observe all slides for animation
    slides.forEach(slide => {
        observer.observe(slide);
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Add scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    scrollProgress.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(scrollProgress);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        const progressBar = document.querySelector('.scroll-progress-bar');
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
    });
});

// Add CSS for additional functionality
const additionalStyles = `
    .nav-links.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 1rem;
        z-index: 1000;
    }
    
    .nav-toggle.active i::before {
        content: "\\f00d";
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    .nav-link.active {
        color: #2563eb;
    }
    
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: rgba(37, 99, 235, 0.1);
        z-index: 9999;
    }
    
    .scroll-progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #2563eb, #1d4ed8);
        width: 0%;
        transition: width 0.1s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .slide {
        animation: fadeInUp 0.6s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @media (max-width: 768px) {
        .nav-links {
            display: none;
        }
        
        .nav-links.active {
            display: flex;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);