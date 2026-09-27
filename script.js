/* =====================================================
   CEFABEX INNOVATIONS
   FUTURISTIC JAVASCRIPT ANIMATION ENGINE
===================================================== */

const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let mouse = {
    x: null,
    y: null,
    radius: 150
};

let animationFrame;


/* =====================================================
   CANVAS SETUP
===================================================== */

function resizeCanvas() {

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    createParticles();
}

window.addEventListener("resize", resizeCanvas);


/* =====================================================
   PARTICLE CLASS
===================================================== */

class Particle {

    constructor() {

        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;

        this.size = Math.random() * 2 + 0.5;

        this.speedX =
            (Math.random() - 0.5) * 0.45;

        this.speedY =
            (Math.random() - 0.5) * 0.45;

        this.opacity =
            Math.random() * 0.7 + 0.15;

        this.pulse =
            Math.random() * Math.PI * 2;
    }


    update() {

        this.x += this.speedX;
        this.y += this.speedY;

        this.pulse += 0.02;

        /* Soft floating motion */

        this.y += Math.sin(this.pulse) * 0.08;


        /* Screen wrapping */

        if (this.x < -10) {
            this.x = window.innerWidth + 10;
        }

        if (this.x > window.innerWidth + 10) {
            this.x = -10;
        }

        if (this.y < -10) {
            this.y = window.innerHeight + 10;
        }

        if (this.y > window.innerHeight + 10) {
            this.y = -10;
        }


        /* Mouse attraction */

        if (mouse.x !== null) {

            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;

            const distance =
                Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {

                const force =
                    (mouse.radius - distance) /
                    mouse.radius;

                this.x -=
                    (dx / distance) *
                    force *
                    0.8;

                this.y -=
                    (dy / distance) *
                    force *
                    0.8;
            }
        }
    }


    draw() {

        const glow =
            Math.sin(this.pulse) * 0.2 + 0.8;

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(65,180,255,${this.opacity * glow})`;

        ctx.shadowBlur = 10;
        ctx.shadowColor = "#008cff";

        ctx.fill();

        ctx.shadowBlur = 0;
    }

}


/* =====================================================
   CREATE PARTICLES
===================================================== */

function createParticles() {

    particles = [];

    const amount =
        window.innerWidth < 600 ? 65 : 130;

    for (let i = 0; i < amount; i++) {
        particles.push(new Particle());
    }
}


/* =====================================================
   CONNECT PARTICLES
===================================================== */

function connectParticles() {

    const maxDistance =
        window.innerWidth < 600 ? 100 : 140;

    for (let a = 0; a < particles.length; a++) {

        for (let b = a + 1; b < particles.length; b++) {

            const dx =
                particles[a].x -
                particles[b].x;

            const dy =
                particles[a].y -
                particles[b].y;

            const distance =
                Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {

                const opacity =
                    1 - distance / maxDistance;

                ctx.beginPath();

                ctx.moveTo(
                    particles[a].x,
                    particles[a].y
                );

                ctx.lineTo(
                    particles[b].x,
                    particles[b].y
                );

                ctx.strokeStyle =
                    `rgba(0,140,255,${opacity * 0.16})`;

                ctx.lineWidth = 0.7;

                ctx.stroke();
            }
        }
    }
}


/* =====================================================
   PARTICLE ANIMATION LOOP
===================================================== */

function animateParticles() {

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    particles.forEach(particle => {

        particle.update();
        particle.draw();

    });

    connectParticles();

    animationFrame =
        requestAnimationFrame(animateParticles);
}


/* =====================================================
   MOUSE TRACKING
===================================================== */

window.addEventListener("mousemove", event => {

    mouse.x = event.clientX;
    mouse.y = event.clientY;

});


window.addEventListener("mouseleave", () => {

    mouse.x = null;
    mouse.y = null;

});


/* =====================================================
   START PARTICLES
===================================================== */

resizeCanvas();
animateParticles();


/* =====================================================
   NAVBAR SCROLL
===================================================== */

const navbar =
    document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn =
    document.getElementById("menuBtn");

const navMenu =
    document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("open");

});


document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
    });

});


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =====================================================
   STAGGERED ANIMATION
===================================================== */

document.querySelectorAll(
    ".service-card, .project-card, .resume-card"
).forEach((card, index) => {

    card.style.transitionDelay =
        `${(index % 4) * 80}ms`;

});


/* =====================================================
   ANIMATED COUNTERS
===================================================== */

const counters =
    document.querySelectorAll("[data-count]");

const counterObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const counter =
                    entry.target;

                const target =
                    Number(counter.dataset.count);

                let current = 0;

                const duration = 1200;

                const start =
                    performance.now();


                function updateCounter(time) {

                    const progress =
                        Math.min(
                            (time - start) /
                            duration,
                            1
                        );

                    current =
                        Math.floor(
                            progress * target
                        );

                    counter.textContent =
                        current;

                    if (progress < 1) {

                        requestAnimationFrame(
                            updateCounter
                        );

                    } else {

                        counter.textContent =
                            target + "+";
                    }
                }

                requestAnimationFrame(
                    updateCounter
                );

                counterObserver.unobserve(counter);

            });

        },

        {
            threshold: 0.7
        }

    );


counters.forEach(counter => {

    counterObserver.observe(counter);

});


/* =====================================================
   SERVICE CARD MOUSE GLOW
===================================================== */

document.querySelectorAll(
    ".service-card"
).forEach(card => {

    card.addEventListener("mousemove", event => {

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        card.style.setProperty(
            "--mouse-x",
            `${x}px`
        );

        card.style.setProperty(
            "--mouse-y",
            `${y}px`
        );

    });

});


/* =====================================================
   3D PROJECT CARD TILT
===================================================== */

document.querySelectorAll(
    ".project-card, .resume-card"
).forEach(card => {

    card.addEventListener("mousemove", event => {

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -5;

        const rotateY =
            ((x - centerX) / centerX) * 5;

        card.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* =====================================================
   HERO PARALLAX
===================================================== */

const heroVisual =
    document.querySelector(".hero-visual");

window.addEventListener("mousemove", event => {

    if (!heroVisual) return;

    const x =
        (event.clientX / window.innerWidth - 0.5);

    const y =
        (event.clientY / window.innerHeight - 0.5);

    heroVisual.style.transform =
        `translate(${x * 15}px, ${y * 15}px)`;

});


/* =====================================================
   PROJECT MODAL
===================================================== */

const projectModal =
    document.getElementById("projectModal");

const modalTitle =
    document.getElementById("modalTitle");

const modalDescription =
    document.getElementById("modalDescription");

const closeProject =
    document.getElementById("closeProject");


document.querySelectorAll(
    ".project-card"
).forEach(card => {

    card.addEventListener("click", () => {

        modalTitle.textContent =
            card.dataset.title;

        modalDescription.textContent =
            card.dataset.description;

        projectModal.classList.add("show");

        document.body.style.overflow =
            "hidden";

    });

});


function closeProjectModal() {

    projectModal.classList.remove("show");

    document.body.style.overflow = "";

}


closeProject.addEventListener(
    "click",
    closeProjectModal
);


/* =====================================================
   RESUME MODAL
===================================================== */

const resumeModal =
    document.getElementById("resumeModal");

const resumeTitle =
    document.getElementById("resumeTitle");

const closeResume =
    document.getElementById("closeResume");


document.querySelectorAll(
    ".resume-card"
).forEach(card => {

    card.addEventListener("click", () => {

        resumeTitle.textContent =
            card.dataset.resume;

        resumeModal.classList.add("show");

        document.body.style.overflow =
            "hidden";

    });

});


closeResume.addEventListener(
    "click",
    () => {

        resumeModal.classList.remove("show");

        document.body.style.overflow = "";

    }
);


/* =====================================================
   CLOSE MODALS BY BACKGROUND CLICK
===================================================== */

[projectModal, resumeModal].forEach(modal => {

    modal.addEventListener("click", event => {

        if (event.target === modal) {

            modal.classList.remove("show");

            document.body.style.overflow = "";

        }

    });

});


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        projectModal.classList.remove("show");
        resumeModal.classList.remove("show");

        document.body.style.overflow = "";

    }

});


/* =====================================================
   SCROLL PROGRESS
===================================================== */

const progressBar =
    document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    progressBar.style.width =
        `${progress}%`;

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll("nav a");

const sectionObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navLinks.forEach(link => {

                        link.classList.remove(
                            "active"
                        );

                    });

                    const active =
                        document.querySelector(
                            `nav a[href="#${entry.target.id}"]`
                        );

                    if (active) {
                        active.classList.add("active");
                    }

                }

            });

        },

        {
            rootMargin: "-35% 0px -55% 0px"
        }

    );


sections.forEach(section => {

    sectionObserver.observe(section);

});


/* =====================================================
   BUTTON RIPPLE
===================================================== */

document.querySelectorAll(
    ".btn"
).forEach(button => {

    button.addEventListener("click", event => {

        const ripple =
            document.createElement("span");

        ripple.style.position = "absolute";

        ripple.style.width = "10px";
        ripple.style.height = "10px";

        ripple.style.borderRadius = "50%";

        ripple.style.background =
            "rgba(255,255,255,0.4)";

        ripple.style.pointerEvents = "none";

        const rect =
            button.getBoundingClientRect();

        ripple.style.left =
            `${event.clientX - rect.left}px`;

        ripple.style.top =
            `${event.clientY - rect.top}px`;

        button.style.position = "relative";
        button.style.overflow = "hidden";

        button.appendChild(ripple);

        ripple.animate(
            [
                {
                    transform: "scale(1)",
                    opacity: 1
                },
                {
                    transform: "scale(20)",
                    opacity: 0
                }
            ],
            {
                duration: 600,
                easing: "ease-out"
            }
        ).onfinish = () => {

            ripple.remove();

        };

    });

});


/* =====================================================
   REDUCED MOTION SUPPORT
===================================================== */

if (
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches
) {

    cancelAnimationFrame(animationFrame);

    document.documentElement.style
        .scrollBehavior = "auto";

         }
