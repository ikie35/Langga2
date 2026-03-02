/* ============================================
   3RD MONTHSARY — VIOLET & ROSE-GOLD JS
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    createWelcomeStars();
    createFallingStars();
    initScrollAnimations();
    startCounter();
    initLightbox();
});

/**
 * Enter the main site from welcome screen
 */
function enterSite() {
    const welcomeScreen = document.getElementById('welcome');
    const mainContent = document.getElementById('mainContent');
    const musicControl = document.getElementById('musicControl');
    const bgMusic = document.getElementById('bgMusic');

    welcomeScreen.classList.add('hidden');

    setTimeout(() => {
        mainContent.classList.add('visible');
    }, 400);

    musicControl.classList.add('visible');

    bgMusic.volume = 0.5;
    bgMusic.play().then(() => {
        document.getElementById('musicBtn').classList.add('playing');
    }).catch(e => console.log('Music autoplay prevented:', e));

    // Burst of stars on enter
    setTimeout(() => {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => createStar(), i * 80);
        }
    }, 600);
}

/**
 * Toggle background music
 */
function toggleMusic() {
    const bgMusic = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicBtn');

    if (bgMusic.paused) {
        bgMusic.play();
        musicBtn.textContent = '🎵';
        musicBtn.classList.remove('muted');
        musicBtn.classList.add('playing');
    } else {
        bgMusic.pause();
        musicBtn.textContent = '🔇';
        musicBtn.classList.add('muted');
        musicBtn.classList.remove('playing');
    }
}

/**
 * Live counter since January 3, 2026
 */
function startCounter() {
    const startDate = new Date('2026-01-03T00:00:00+08:00');

    function update() {
        const now = new Date();
        const diff = now - startDate;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('counterDays');
        const hoursEl = document.getElementById('counterHours');
        const minutesEl = document.getElementById('counterMinutes');
        const secondsEl = document.getElementById('counterSeconds');

        if (daysEl) daysEl.textContent = days;
        if (hoursEl) hoursEl.textContent = hours;
        if (minutesEl) minutesEl.textContent = minutes;
        if (secondsEl) secondsEl.textContent = seconds;
    }

    update();
    setInterval(update, 1000);
}

/**
 * Create stars on the welcome screen background
 */
function createWelcomeStars() {
    const container = document.querySelector('.welcome-stars');
    if (!container) return;

    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.classList.add('welcome-star');
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = (Math.random() * 3 + 1) + 'px';
        star.style.height = star.style.width;
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        star.style.animationDelay = Math.random() * 4 + 's';
        container.appendChild(star);
    }
}

/**
 * Falling star particles
 */
function createFallingStars() {
    setInterval(() => {
        const container = document.getElementById('starsContainer');
        if (container && container.children.length < 10) {
            createStar();
        }
    }, 2000);

    // Initial stars
    for (let i = 0; i < 4; i++) {
        setTimeout(() => createStar(), i * 600);
    }
}

function createStar() {
    const container = document.getElementById('starsContainer');
    if (!container) return;

    const star = document.createElement('div');
    star.classList.add('star');

    // Various star shapes
    const shapes = [
        // Purple sparkle
        `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#a78bfa" opacity="0.7"/></svg>`,
        // Gold sparkle
        `<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#fbbf24" opacity="0.6"/></svg>`,
        // Small heart
        `<svg width="14" height="14" viewBox="0 0 24 24" fill="#f43f5e" opacity="0.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
        // Rose petal
        `<svg width="12" height="16" viewBox="0 0 12 16" fill="none"><ellipse cx="6" cy="9" rx="5" ry="7" fill="#fb7185" opacity="0.45"/></svg>`,
        // Tiny star
        `<svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#c4b5fd" opacity="0.5"/></svg>`,
    ];

    star.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];

    const size = Math.random() * 0.6 + 0.7;
    star.style.left = Math.random() * 100 + '%';
    star.style.transform = `scale(${size})`;
    star.style.animationDuration = (Math.random() * 6 + 5) + 's';
    star.style.animationDelay = Math.random() * 2 + 's';

    container.appendChild(star);

    setTimeout(() => star.remove(), 13000);
}

/**
 * Scroll animations
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll(
        '.letter-section, .gallery-section, .reasons-section, .timeline-section, .promise-section'
    );
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        observer.observe(section);
    });

    const items = document.querySelectorAll(
        '.reason-card, .timeline-item, .gallery-item'
    );
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.07}s, transform 0.6s ease ${index * 0.07}s`;
        observer.observe(item);
    });
}

/**
 * Lightbox for gallery images
 */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');

    if (!lightbox || !lightboxImg) return;

    // Click gallery items to open lightbox
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Console message
console.log('💜 Happy 2nd Monthsary — Made with love! 💜');
