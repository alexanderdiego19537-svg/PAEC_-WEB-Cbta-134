document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // Corrección Inmediata de Visibilidad (Seguridad)
    // ========================================
    setTimeout(() => {
        document.querySelectorAll('.fade-in:not(.visible)').forEach(el => {
            el.classList.add('visible');
            el.style.opacity = '1';
        });
    }, 500);

    // ========================================
    // Observador de Intersección
    // ========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in, .animate-up, .slide-left');
    fadeElements.forEach(el => observer.observe(el));

    // ========================================
    // Navegación Móvil
    // ========================================
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });

        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            });
        });

        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    }

    // ========================================
    // Encabezado Fijo al Hacer Scroll
    // ========================================
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
});
