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

    /* === Carrousel Rise of Freedom === */
    const riseCarousel = document.querySelector("#rise-carousel");
    if (riseCarousel) {
        const track = riseCarousel.querySelector(".carousel-track");
        const images = Array.from(track.children);
        const nextButton = riseCarousel.querySelector(".next");
        const prevButton = riseCarousel.querySelector(".prev");
        const dotsContainer = document.querySelector("#rise-dots");

        let currentIndex = 0;

        // Création des petits points
        images.forEach((_, i) => {
            const dot = document.createElement("button");
            if (i === 0) dot.classList.add("active");
            dotsContainer.appendChild(dot);
        });
        const dots = Array.from(dotsContainer.children);

        // Met à jour le carrousel
        function updateCarousel(index) {
            track.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
        }

        // Navigation
        nextButton?.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % images.length;
            updateCarousel(currentIndex);
        });

        prevButton?.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateCarousel(currentIndex);
        });

        // Clic sur un point
        dots.forEach((dot, i) => {
            dot.addEventListener("click", () => {
                currentIndex = i;
                updateCarousel(currentIndex);
            });
        });

        // Défilement automatique
        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            updateCarousel(currentIndex);
        }, 5000);
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
