document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Button
    const themeToggle = document.getElementById('theme-toggle');
    
    // Sections for Animation
    const sections = document.querySelectorAll('.animated-section');
    
    // Buttons with Pop-up Animations
    const buttons = document.querySelectorAll('.pop-button');
    
    // Custom Cursor Elements
    const cursor = document.querySelector("#cursor");
    const cursorBorder = document.querySelector("#cursor-border");

    // Cursor Position Tracking
    const cursorPos = { x: 0, y: 0 };
    const cursorBorderPos = { x: 0, y: 0 };

    /* Theme Toggle Functionality */
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');

        // Update Cursor Color based on the new theme
        if (document.body.classList.contains('dark-mode')) {
            cursorBorder.style.boxShadow = "0 0 0 1px white"; // Light border in dark mode
            cursorBorder.style.backgroundColor = "black";
        } else {
            cursorBorder.style.boxShadow = "0 0 0 1px black"; // Dark border in light mode
            cursorBorder.style.backgroundColor = "white";
        }
    });

    /* Smooth Scroll and Section Animations */
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

    /* Pop-up Animations on Button Clicks */
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            gsap.to(button, { scale: 1.2, duration: 0.3, ease: 'power1.out' })
                .then(() => gsap.to(button, { scale: 1, duration: 0.3, ease: 'power1.in' }));
        });
    });

    /* Custom Cursor Animation */
    document.addEventListener("mousemove", (e) => {
        cursorPos.x = e.clientX;
        cursorPos.y = e.clientY;
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    requestAnimationFrame(function loop() {
        const easting = 8; // Smoother easing factor
        cursorBorderPos.x += (cursorPos.x - cursorBorderPos.x) / easting;
        cursorBorderPos.y += (cursorPos.y - cursorBorderPos.y) / easting;
        cursorBorder.style.transform = `translate(${cursorBorderPos.x}px, ${cursorBorderPos.y}px)`;
        requestAnimationFrame(loop);
    });

    /* Cursor Effects Based on Data Attributes */
    document.querySelectorAll("[data-cursor]").forEach((item) => {
        item.addEventListener("mouseover", (e) => {
            if (item.dataset.cursor === "pointer") {
                cursorBorder.style.backgroundColor = "rgba(255, 255, 255, .6)";
                cursorBorder.style.setProperty("--size", "30px");
            }
            if (item.dataset.cursor === "pointer2") {
                cursorBorder.style.backgroundColor = "white";
                cursorBorder.style.mixBlendMode = "difference"; // Creates an inverted effect
                cursorBorder.style.setProperty("--size", "80px");
            }
        });

        item.addEventListener("mouseout", (e) => {
            // Reset to default styles when not hovering
            cursorBorder.style.backgroundColor = "";
            cursorBorder.style.mixBlendMode = "";
            cursorBorder.style.setProperty("--size", "50px");
            
            // Optionally, you can also reset the theme-specific colors here if needed.
        });
    });

    /* Smooth Scroll to Section Links */
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});