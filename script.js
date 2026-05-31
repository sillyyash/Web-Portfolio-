document.addEventListener('DOMContentLoaded', () => {

    // ── Theme Toggle ──────────────────────────────
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-mode');
        document.body.classList.toggle('dark-mode', !isDark);
        document.body.classList.toggle('light-mode', isDark);
    });

    // ── Section Animations ────────────────────────
    const sections = document.querySelectorAll('.animated-section');

    sections.forEach((section, index) => {
        gsap.from(section, { opacity: 0, y: 50, duration: 1, delay: index * 0.2 });
    });

    window.addEventListener('scroll', () => {
        sections.forEach(section => {
            if (section.getBoundingClientRect().top < window.innerHeight / 1.5) {
                gsap.to(section, { opacity: 1, y: 0, duration: 1 });
            }
        });
    });

    // ── Pop Buttons ───────────────────────────────
    document.querySelectorAll('.pop-button').forEach(button => {
        button.addEventListener('click', () => {
            gsap.to(button, { scale: 1.2, duration: 0.3, ease: 'power1.out' })
                .then(() => gsap.to(button, { scale: 1, duration: 0.3, ease: 'power1.in' }));
        });
    });

    // ── Smooth Nav Scroll ─────────────────────────
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // ── Custom Cursor ─────────────────────────────
    const dot  = document.getElementById('cursor-dot');
    const glow = document.getElementById('cursor-glow');

    // Actual mouse position
    let mx = -100, my = -100;
    // Glow lags behind here
    let gx = -100, gy = -100;

    // Track mouse — move dot instantly
    document.addEventListener('mousemove', (e) => {
        mx = e.clientX;
        my = e.clientY;
        // Offset so dot center sits exactly on pointer tip
        dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
    });

    // Animate glow ring with smooth lag via rAF
    function animateGlow() {
        // Ease factor: smaller = more lag
        gx += (mx - gx) * 0.1;
        gy += (my - gy) * 0.1;
        // Offset so ring is centered on cursor
        glow.style.transform = `translate(${gx - 20}px, ${gy - 20}px)`;
        requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // Hover effect — add class to body so CSS handles the styling
    const interactives = document.querySelectorAll('a, button, .pop-button, input, [data-hover]');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // Hide when mouse leaves window
    document.addEventListener('mouseleave', () => {
        dot.style.opacity  = '0';
        glow.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        dot.style.opacity  = '1';
        glow.style.opacity = '1';
    });

});