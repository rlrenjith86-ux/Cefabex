/* =========================================================
   CEFABEX INNOVATIONS
   JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       YEAR
    ===================================================== */

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            mainNav.classList.toggle("open");

        });


        document.querySelectorAll(".nav-link")
            .forEach(link => {

                link.addEventListener("click", () => {

                    mainNav.classList.remove("open");

                });

            });

    }


    /* =====================================================
       PARTICLE BACKGROUND
    ===================================================== */

    const canvas =
        document.getElementById("particleCanvas");

    if (canvas) {

        const ctx =
            canvas.getContext("2d");

        let particles = [];

        let mouse = {
            x: null,
            y: null,
            radius: 130
        };


        function resizeCanvas() {

            canvas.width =
                window.innerWidth;

            canvas.height =
                window.innerHeight;

            createParticles();

        }


        class Particle {

            constructor() {

                this.x =
                    Math.random() *
                    canvas.width;

                this.y =
                    Math.random() *
                    canvas.height;

                this.size =
                    Math.random() * 1.8 + 0.5;

                this.speedX =
                    (Math.random() - 0.5) * 0.35;

                this.speedY =
                    (Math.random() - 0.5) * 0.35;

                this.opacity =
                    Math.random() * 0.6 + 0.15;

            }


            update() {

                this.x += this.speedX;
                this.y += this.speedY;


                if (this.x < 0)
                    this.x = canvas.width;

                if (this.x > canvas.width)
                    this.x = 0;

                if (this.y < 0)
                    this.y = canvas.height;

                if (this.y > canvas.height)
                    this.y = 0;


                if (mouse.x !== null) {

                    const dx =
                        this.x - mouse.x;

                    const dy =
                        this.y - mouse.y;

                    const distance =
                        Math.sqrt(
                            dx * dx +
                            dy * dy
                        );

                    if (distance < mouse.radius) {

                        const force =
                            (mouse.radius -
                                distance) /
                            mouse.radius;

                        this.x +=
                            (dx / distance) *
                            force *
                            0.7;

                        this.y +=
                            (dy / distance) *
                            force *
                            0.7;

                    }

                }

            }


            draw() {

                ctx.beginPath();

                ctx.arc(
                    this.x,
                    this.y,
                    this.size,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    `rgba(67,183,255,${this.opacity})`;

                ctx.fill();

            }

        }


        function createParticles() {

            particles = [];

            const amount =
                window.innerWidth < 700
                    ? 55
                    : 120;

            for (let i = 0; i < amount; i++) {

                particles.push(
                    new Particle()
                );

            }

        }


        function connectParticles() {

            for (
                let i = 0;
                i < particles.length;
                i++
            ) {

                for (
                    let j = i + 1;
                    j < particles.length;
                    j++
                ) {

                    const dx =
                        particles[i].x -
                        particles[j].x;

                    const dy =
                        particles[i].y -
                        particles[j].y;

                    const distance =
                        Math.sqrt(
                            dx * dx +
                            dy * dy
                        );


                    if (distance < 115) {

                        const opacity =
                            (1 -
                                distance / 115) *
                            0.12;

                        ctx.beginPath();

                        ctx.moveTo(
                            particles[i].x,
                            particles[i].y
                        );

                        ctx.lineTo(
                            particles[j].x,
                            particles[j].y
                        );

                        ctx.strokeStyle =
                            `rgba(0,140,255,${opacity})`;

                        ctx.lineWidth = 0.7;

                        ctx.stroke();

                    }

                }

            }

        }


        function animateParticles() {

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );


            particles.forEach(particle => {

                particle.update();

                particle.draw();

            });


            connectParticles();

            requestAnimationFrame(
                animateParticles
            );

        }


        window.addEventListener(
            "resize",
            resizeCanvas
        );


        window.addEventListener(
            "mousemove",
            event => {

                mouse.x =
                    event.clientX;

                mouse.y =
                    event.clientY;

            }
        );


        window.addEventListener(
            "mouseleave",
            () => {

                mouse.x = null;
                mouse.y = null;

            }
        );


        resizeCanvas();

        animateParticles();

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target
                                .classList
                                .remove("hidden");

                            observer.unobserve(
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

            element.classList.add("hidden");

            observer.observe(element);

        });

    }


    /* =====================================================
       COUNTERS
    ===================================================== */

    const counters =
        document.querySelectorAll(
            "[data-count]"
        );


    if ("IntersectionObserver" in window) {

        const counterObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting)
                            return;

                        const counter =
                            entry.target;

                        const target =
                            Number(
                                counter.dataset.count
                            );

                        let current = 0;

                        const duration = 1200;

                        const start =
                            performance.now();


                        function updateCounter(now) {

                            const progress =
                                Math.min(
                                    (now - start) /
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
                                    target;

                            }

                        }


                        requestAnimationFrame(
                            updateCounter
                        );


                        counterObserver.unobserve(
                            counter
                        );

                    });

                },
                {
                    threshold: 0.7
                }
            );


        counters.forEach(counter => {

            counterObserver.observe(counter);

        });

    }


    /* =====================================================
       PROJECT MODAL
    ===================================================== */

    const projectModal =
        document.getElementById(
            "projectModal"
        );

    const projectTitle =
        document.getElementById(
            "modalProjectTitle"
        );

    const projectDescription =
        document.getElementById(
            "modalProjectDescription"
        );

    const projectClose =
        document.getElementById(
            "projectModalClose"
        );


    document.querySelectorAll(
        ".project-card"
    ).forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const title =
                    card.dataset.title ||
                    "Project";

                const description =
                    card.dataset.description ||
                    "CEFABEX project.";

                projectTitle.textContent =
                    title;

                projectDescription.textContent =
                    description;

                projectModal.classList.add(
                    "show"
                );

                document.body.style.overflow =
                    "hidden";

            }
        );

    });


    function closeProjectModal() {

        projectModal.classList.remove(
            "show"
        );

        document.body.style.overflow =
            "";

    }


    if (projectClose) {

        projectClose.addEventListener(
            "click",
            closeProjectModal
        );

    }


    if (projectModal) {

        projectModal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    projectModal
                ) {

                    closeProjectModal();

                }

            }
        );

    }


    /* =====================================================
       RESUME MODAL
    ===================================================== */

    const resumeModal =
        document.getElementById(
            "resumeModal"
        );

    const resumeImage =
        document.getElementById(
            "resumeModalImage"
        );

    const resumeClose =
        document.getElementById(
            "resumeModalClose"
        );


    document.querySelectorAll(
        ".resume-view"
    ).forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                const image =
                    button.dataset.image;

                if (
                    !image ||
                    image.includes("resume-")
                ) {

                    return;

                }

                resumeImage.src =
                    image;

                resumeModal.classList.add(
                    "show"
                );

                document.body.style.overflow =
                    "hidden";

            }
        );

    });


    function closeResumeModal() {

        resumeModal.classList.remove(
            "show"
        );

        resumeImage.src = "";

        document.body.style.overflow =
            "";

    }


    if (resumeClose) {

        resumeClose.addEventListener(
            "click",
            closeResumeModal
        );

    }


    if (resumeModal) {

        resumeModal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    resumeModal
                ) {

                    closeResumeModal();

                }

            }
        );

    }


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                if (projectModal) {

                    projectModal.classList.remove(
                        "show"
                    );

                }

                if (resumeModal) {

                    resumeModal.classList.remove(
                        "show"
                    );

                }

                document.body.style.overflow =
                    "";

            }

        }
    );


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    const scrollProgress =
        document.getElementById(
            "scrollProgress"
        );


    window.addEventListener(
        "scroll",
        () => {

            const scrollTop =
                window.scrollY;

            const documentHeight =
                document.documentElement
                    .scrollHeight -
                window.innerHeight;

            const percentage =
                documentHeight > 0
                    ? (scrollTop /
                        documentHeight) *
                      100
                    : 0;


            if (scrollProgress) {

                scrollProgress.style.width =
                    `${percentage}%`;

            }

        },
        {
            passive: true
        }
    );


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    if ("IntersectionObserver" in window) {

        const navObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            navLinks.forEach(
                                link => {

                                    link.classList
                                        .remove(
                                            "active"
                                        );

                                    if (
                                        link.getAttribute(
                                            "href"
                                        ) ===
                                        "#" +
                                        entry.target.id
                                    ) {

                                        link.classList
                                            .add(
                                                "active"
                                            );

                                    }

                                }
                            );

                        }

                    });

                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px"
                }
            );


        sections.forEach(section => {

            navObserver.observe(section);

        });

    }


    /* =====================================================
       SERVICE CARD MOUSE GLOW
    ===================================================== */

    document.querySelectorAll(
        ".service-card"
    ).forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;


                card.style.background =
                    `
                    radial-gradient(
                        circle at ${x}px ${y}px,
                        rgba(0,140,255,0.13),
                        rgba(4,17,37,0.75) 45%
                    )
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.background =
                    "";

            }
        );

    });


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const heroVisual =
        document.querySelector(
            ".hero-visual"
        );


    window.addEventListener(
        "mousemove",
        event => {

            if (
                !heroVisual ||
                window.innerWidth < 800
            ) {

                return;

            }


            const x =
                (event.clientX /
                    window.innerWidth -
                    0.5) *
                10;

            const y =
                (event.clientY /
                    window.innerHeight -
                    0.5) *
                10;


            heroVisual.style.transform =
                `translate(${x}px, ${y}px)`;

        }
    );


    /* =====================================================
       BUTTON RIPPLE
    ===================================================== */

    document.querySelectorAll(
        ".btn"
    ).forEach(button => {

        button.addEventListener(
            "click",
            event => {

                const ripple =
                    document.createElement(
                        "span"
                    );

                ripple.style.position =
                    "absolute";

                ripple.style.width =
                    "10px";

                ripple.style.height =
                    "10px";

                ripple.style.borderRadius =
                    "50%";

                ripple.style.background =
                    "rgba(255,255,255,0.3)";

                ripple.style.pointerEvents =
                    "none";

                ripple.style.left =
                    `${event.offsetX}px`;

                ripple.style.top =
                    `${event.offsetY}px`;

                ripple.style.transform =
                    "translate(-50%,-50%)";

                button.style.position =
                    "relative";

                button.style.overflow =
                    "hidden";

                button.appendChild(ripple);


                setTimeout(() => {

                    ripple.remove();

                }, 500);

            }
        );

    });

});
