document.addEventListener("DOMContentLoaded", () => {

    /* === Onglets dynamiques === */
    const buttons = document.querySelectorAll(".tab-btn, .unity-btn");
    const contents = document.querySelectorAll(".content, .project-section"); // inclut Pokémon
    const body = document.body;

    /* === Audio === */
    let currentAudio = null;
    let isAudioInitialized = false;
    let lastVolume = 0.4;

    /* === Configuration des pages === */
    const pageData = {
        owen: {
            bg: "imgs/owen/foret.gif",
            music: "Song/owensong.mp3"
        },
        rise: {
            bg: "imgs/rof/mlk.gif",
            music: "Song/mlk.mp3"
        },
        pokemon: {
            bg: "imgs/poke/fond.gif",
            music: "Song/pokeSong.mp3"
        }
    };

    /* === Contrôles du volume === */
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
        if (currentAudio.muted) {
            currentAudio.muted = false;
            currentAudio.volume = lastVolume;
        } else {
            currentAudio.muted = true;
        }
    }

    volUp?.addEventListener("click", () => setVolume(currentAudio ? currentAudio.volume + 0.1 : lastVolume + 0.1));
    volDown?.addEventListener("click", () => setVolume(currentAudio ? currentAudio.volume - 0.1 : lastVolume - 0.1));
    volMute?.addEventListener("click", toggleMute);

    /* === Fonction pour changer de section === */
    function showContent(id) {
        // Cache toutes les sections
        contents.forEach(c => c.classList.remove("active"));
        document.getElementById(id)?.classList.add("active");

        // Change le fond selon la page
        if (pageData[id]) body.style.backgroundImage = `url('${pageData[id].bg}')`;

        // Stop musique précédente
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        // Lance la musique de la page
        if (pageData[id]?.music) {
            currentAudio = new Audio(pageData[id].music);
            currentAudio.volume = lastVolume;
            currentAudio.loop = true;

            if (isAudioInitialized) {
                currentAudio.play().catch(err => console.warn("Lecture audio bloquée :", err));
            }
        }

        // Fait défiler vers le haut en douceur
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    /* === Navigation entre les sections === */
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            showContent(btn.dataset.target);
        });
    });

    /* === Section par défaut === */
    const defaultId = "owen";
    document.querySelector(`.unity-btn[data-target="${defaultId}"]`)?.classList.add("active");
    showContent(defaultId);

    /* === Déblocage audio au premier clic === */
    document.addEventListener("click", () => {
        if (!isAudioInitialized) {
            isAudioInitialized = true;
            if (currentAudio) {
                currentAudio.play().catch(err => console.warn("Lecture audio bloquée :", err));
            }
        }
    }, { once: true });

    /* === Carrousel Rise of Freedom (PRO) === */
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
        }

        const dots = dotsContainer ? Array.from(dotsContainer.children) : [];

        function update() {
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

        // Clavier (quand le carousel est focus)
        riseCarousel.tabIndex = 0;
        riseCarousel.addEventListener("keydown", (e) => {
            if (e.key === "ArrowRight") { next(); restartAuto(); }
            if (e.key === "ArrowLeft") { prev(); restartAuto(); }
        });

        // Swipe mobile (touch)
        let startX = 0;
        let currentX = 0;
        let isDown = false;

        const viewport = riseCarousel.querySelector(".rise-viewport");

        viewport.addEventListener("touchstart", (e) => {
            isDown = true;
            startX = e.touches[0].clientX;
            currentX = startX;
        }, { passive: true });

        viewport.addEventListener("touchmove", (e) => {
            if (!isDown) return;
            currentX = e.touches[0].clientX;
        }, { passive: true });

        viewport.addEventListener("touchend", () => {
            if (!isDown) return;
            isDown = false;

            const diff = currentX - startX;
            const threshold = 40; // sensibilité swipe

            if (diff > threshold) prev();
            else if (diff < -threshold) next();

            restartAuto();
        });

        // Autoplay (pause hover)
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


//NAV///
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("open");
        navLinks.classList.toggle("open");
    });
});
