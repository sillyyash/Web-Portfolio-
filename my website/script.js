document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const sections = document.querySelectorAll('.animated-section');
    const buttons = document.querySelectorAll('.pop-button');
    const cursorFollower = document.querySelector('.cursor-follower');

    // Toggle Theme
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
    });

    // Smooth Scroll and Animate Sections
    window.addEventListener('scroll', () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight / 1.5) {
                gsap.to(section, { opacity: 1, y: 0, duration: 1 });
            }
        });
    });

    // Initial Animation for Sections
    sections.forEach((section, index) => {
        gsap.from(section, { opacity: 0, y: 50, duration: 1, delay: index * 0.2 });
    });

    // Pop-up Animations on Button Clicks
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            gsap.to(button, { scale: 1.2, duration: 0.3, ease: 'power1.out' })
                .then(() => gsap.to(button, { scale: 1, duration: 0.3, ease: 'power1.in' }));
        });
    });

    // Cursor Follower
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursorFollower, { x: e.clientX - cursorFollower.offsetWidth / 2, y: e.clientY - cursorFollower.offsetHeight / 2, duration: 0.1, ease: 'power1.out' });
    });

    // Smooth Scroll to Section
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});