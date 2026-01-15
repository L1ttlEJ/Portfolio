document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       NAV BURGER
    ========================== */
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("open");
            navLinks.classList.toggle("open");
        });

        // ferme le menu après clic sur un lien (mobile)
        navLinks.addEventListener("click", (e) => {
            const a = e.target.closest("a");
            if (!a) return;
            menuToggle.classList.remove("open");
            navLinks.classList.remove("open");
        });
    }

    /* =========================
       TABS + FOND + AUDIO
    ========================== */
    const buttons = document.querySelectorAll(".unity-btn"); // ici tu n'as que unity-btn
    const contents = document.querySelectorAll(".content, .project-section");
    const body = document.body;

    let currentAudio = null;
    let isAudioInitialized = false;
    let lastVolume = 0.4;

    const pageData = {
        owen: { bg: "imgs/owen/foret.gif", music: "Song/owensong.mp3" },
        rise: { bg: "imgs/rof/mlk.gif", music: "Song/mlk.mp3" },
        pokemon: { bg: "imgs/poke/fond.gif", music: "Song/pokeSong.mp3" }
    };

    const volUp = document.querySelector("#volume-up");
    const volDown = document.querySelector("#volume-down");
    const volMute = document.querySelector("#volume-mute");

    function setVolume(value) {
        if (!currentAudio) return;
        currentAudio.volume = Math.min(1, Math.max(0, value));
        lastVolume = currentAudio.volume;
    }

    function toggleMute() {
        if (!currentAudio) return;
        currentAudio.muted = !currentAudio.muted;
        if (!currentAudio.muted) currentAudio.volume = lastVolume;
    }

    volUp?.addEventListener("click", () => {
        if (!currentAudio) return;
        setVolume(currentAudio.volume + 0.1);
    });

    volDown?.addEventListener("click", () => {
        if (!currentAudio) return;
        setVolume(currentAudio.volume - 0.1);
    });

    volMute?.addEventListener("click", toggleMute);

    function stopAudio() {
        if (!currentAudio) return;
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }

    function startAudioFor(id) {
        const data = pageData[id];
        if (!data?.music) return;

        currentAudio = new Audio(data.music);
        currentAudio.volume = lastVolume;
        currentAudio.loop = true;

        if (isAudioInitialized) {
            currentAudio.play().catch(err => console.warn("Lecture audio bloquée :", err));
        }
    }

    function showContent(id) {
        contents.forEach(c => c.classList.remove("active"));
        document.getElementById(id)?.classList.add("active");

        if (pageData[id]?.bg) {
            body.style.backgroundImage = `url('${pageData[id].bg}')`;
        }

        stopAudio();
        startAudioFor(id);

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            showContent(btn.dataset.target);
        });
    });

    // Default
    const defaultId = "owen";
    document.querySelector(`.unity-btn[data-target="${defaultId}"]`)?.classList.add("active");
    showContent(defaultId);

    // Déblocage audio au premier clic
    document.addEventListener("click", () => {
        if (isAudioInitialized) return;
        isAudioInitialized = true;
        if (currentAudio) {
            currentAudio.play().catch(err => console.warn("Lecture audio bloquée :", err));
        }
    }, { once: true });


    /* =========================
       OWEN CAROUSEL (scroll)
       Tes boutons existent dans le HTML Owen
    ========================== */
    const owenCarousel = document.querySelector("#owen .carousel");
    if (owenCarousel) {
        const track = owenCarousel.querySelector(".carousel-track");
        const next = owenCarousel.querySelector(".carousel-btn.next");
        const prev = owenCarousel.querySelector(".carousel-btn.prev");

        next?.addEventListener("click", () => {
            track?.scrollBy({ left: 320, behavior: "smooth" });
        });

        prev?.addEventListener("click", () => {
            track?.scrollBy({ left: -320, behavior: "smooth" });
        });
    }


    /* =========================
       RISE CAROUSEL (PRO)
    ========================== */
    const riseCarousel = document.querySelector("#rise-carousel");
    if (riseCarousel) {
        const track = riseCarousel.querySelector(".rise-track");
        const slides = Array.from(riseCarousel.querySelectorAll(".rise-slide"));
        const btnNext = riseCarousel.querySelector(".rise-btn.next");
        const btnPrev = riseCarousel.querySelector(".rise-btn.prev");
        const dotsContainer = document.querySelector("#rise-dots");

        let index = 0;
        let autoTimer = null;
        let isHover = false;

        // Dots
        let dots = [];
        if (dotsContainer) {
            dotsContainer.innerHTML = "";
            slides.forEach((_, i) => {
                const dot = document.createElement("button");
                dot.type = "button";
                dot.setAttribute("aria-label", `Aller à l'image ${i + 1}`);
                dot.addEventListener("click", () => {
                    index = i;
                    update();
                    restartAuto();
                });
                dotsContainer.appendChild(dot);
            });
            dots = Array.from(dotsContainer.children);
        }

        function update() {
            if (!track) return;
            track.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach((d, i) => d.classList.toggle("active", i === index));
        }

        function next() {
            index = (index + 1) % slides.length;
            update();
        }

        function prev() {
            index = (index - 1 + slides.length) % slides.length;
            update();
        }

        btnNext?.addEventListener("click", () => { next(); restartAuto(); });
        btnPrev?.addEventListener("click", () => { prev(); restartAuto(); });

        // clavier
        riseCarousel.tabIndex = 0;
        riseCarousel.addEventListener("keydown", (e) => {
            if (e.key === "ArrowRight") { next(); restartAuto(); }
            if (e.key === "ArrowLeft") { prev(); restartAuto(); }
        });

        // swipe mobile
        const viewport = riseCarousel.querySelector(".rise-viewport");
        let startX = 0;
        let currentX = 0;
        let isDown = false;

        viewport?.addEventListener("touchstart", (e) => {
            isDown = true;
            startX = e.touches[0].clientX;
            currentX = startX;
        }, { passive: true });

        viewport?.addEventListener("touchmove", (e) => {
            if (!isDown) return;
            currentX = e.touches[0].clientX;
        }, { passive: true });

        viewport?.addEventListener("touchend", () => {
            if (!isDown) return;
            isDown = false;

            const diff = currentX - startX;
            const threshold = 40;

            if (diff > threshold) prev();
            else if (diff < -threshold) next();

            restartAuto();
        });

        // autoplay + pause hover
        function startAuto() {
            if (autoTimer) clearInterval(autoTimer);
            autoTimer = setInterval(() => {
                if (!isHover) next();
            }, 5000);
        }

        function restartAuto() {
            startAuto();
        }

        riseCarousel.addEventListener("mouseenter", () => { isHover = true; });
        riseCarousel.addEventListener("mouseleave", () => { isHover = false; });

        update();
        startAuto();
    }

});
