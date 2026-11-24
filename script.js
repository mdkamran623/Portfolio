document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Custom Smooth Cursor
    const dot = document.getElementById('cursorDot');
    const outline = document.getElementById('cursorOutline');
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if(!isTouch && dot && outline) {
        let mx = 0, my = 0, ox = 0, oy = 0;

        window.addEventListener('mousemove', (e) => {
            mx = e.clientX; my = e.clientY;
            dot.style.left = mx + 'px'; dot.style.top = my + 'px';
        });

        function animate() {
            ox += (mx - ox) * 0.15;
            oy += (my - oy) * 0.15;
            outline.style.left = ox + 'px'; outline.style.top = oy + 'px';
            requestAnimationFrame(animate);
        }
        animate();

        // Hover effect on clickable elements
        const links = document.querySelectorAll('a, button, input, textarea, .bento-card');
        links.forEach(l => {
            l.addEventListener('mouseenter', () => outline.classList.add('hover'));
            l.addEventListener('mouseleave', () => outline.classList.remove('hover'));
        });
    }

    // 2. Mobile Menu
    const burger = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if(burger) {
        burger.addEventListener('click', () => {
            mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // 3. Scroll Reveal Animations
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));

    // 4. Form Submit Mockup
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = document.getElementById('submitBtn');
            btn.textContent = 'Sending...';
            setTimeout(() => {
                status.textContent = "Message sent! I'll get back to you soon.";
                btn.textContent = 'Send Message';
                form.reset();
            }, 1500);
        });
    }
});
