// audiovisuel.js — Navbar + Onglets + Lightbox 3D + Carousel (optimisé)
// Compatible avec ton HTML/CSS :
// - Galerie 3D : .gallery-3d (ou id="gallery-3d")
// - Carousel : .carousel-track contient des .carousel-item (img + .carousel-caption)

document.addEventListener("DOMContentLoaded", () => {
    console.log("Portfolio AudioVisuel chargé !");

    /* =========================
       NAVBAR MOBILE
    ========================== */
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("open");
            navLinks.classList.toggle("open");
        });

        // (optionnel) ferme le menu au clic sur un lien
        navLinks.addEventListener("click", (e) => {
            const a = e.target.closest("a");
            if (!a) return;
            menuToggle.classList.remove("open");
            navLinks.classList.remove("open");
        });
    }

    /* =========================
       ONGLET AUDIOVISUEL
    ========================== */
    const tabButtons = Array.from(document.querySelectorAll(".av-btn"));
    const tabContents = Array.from(document.querySelectorAll(".content"));

    function showTab(id) {
        const target = document.getElementById(id);
        if (!target) return; // évite les bugs si une section manque (ex: "video")

        tabContents.forEach((section) => {
            section.classList.toggle("active", section.id === id);
        });

        tabButtons.forEach((btn) => {
            btn.classList.toggle("active", btn.dataset.target === id);
        });

        target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    tabButtons.forEach((btn) => {
        btn.addEventListener("click", () => showTab(btn.dataset.target));
    });

    // Onglet par défaut (si existe)
    if (document.getElementById("d3")) showTab("d3");

    /* =========================
       LIGHTBOX / GALLERY 3D
    ========================== */
    const gallery =
        document.getElementById("gallery-3d") || document.querySelector(".gallery-3d");

    if (gallery) {
        let galleryImages = Array.from(gallery.querySelectorAll(".gallery-item img"));
        let currentIndex = 0;

        // crée la lightbox (unique)
        const lightbox = document.createElement("div");
        lightbox.id = "lightbox-3d";
        lightbox.innerHTML = `
      <div class="lightbox-content" role="dialog" aria-modal="true">
        <span class="lightbox-close" aria-label="Fermer">&times;</span>
        <img class="lightbox-img" src="" alt="">
        <div class="lightbox-arrow left" role="button" aria-label="Précédent">&#10094;</div>
        <div class="lightbox-arrow right" role="button" aria-label="Suivant">&#10095;</div>
      </div>
    `;
        document.body.appendChild(lightbox);

        const lightboxImg = lightbox.querySelector(".lightbox-img");
        const closeBtn = lightbox.querySelector(".lightbox-close");
        const arrowLeft = lightbox.querySelector(".lightbox-arrow.left");
        const arrowRight = lightbox.querySelector(".lightbox-arrow.right");

        function lockScroll(lock) {
            document.documentElement.style.overflow = lock ? "hidden" : "";
        }

        function openLightbox(index) {
            galleryImages = Array.from(gallery.querySelectorAll(".gallery-item img"));
            if (!galleryImages.length) return;

            currentIndex = index;
            const img = galleryImages[currentIndex];

            lightboxImg.src = img.getAttribute("src");
            lightboxImg.alt = img.getAttribute("alt") || "";
            lightbox.classList.add("show");
            lockScroll(true);
        }

        function closeLightbox() {
            lightbox.classList.remove("show");
            lightboxImg.src = "";
            lockScroll(false);
        }

        function showNext() {
            if (!galleryImages.length) return;
            currentIndex = (currentIndex + 1) % galleryImages.length;
            openLightbox(currentIndex);
        }

        function showPrev() {
            if (!galleryImages.length) return;
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            openLightbox(currentIndex);
        }

        // clic sur vignette (delegation)
        gallery.addEventListener("click", (e) => {
            const img = e.target.closest(".gallery-item img");
            if (!img) return;

            galleryImages = Array.from(gallery.querySelectorAll(".gallery-item img"));
            const index = galleryImages.indexOf(img);
            if (index >= 0) openLightbox(index);
        });

        // boutons lightbox
        closeBtn.addEventListener("click", closeLightbox);
        arrowLeft.addEventListener("click", (e) => {
            e.stopPropagation();
            showPrev();
        });
        arrowRight.addEventListener("click", (e) => {
            e.stopPropagation();
            showNext();
        });

        // clic hors contenu
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        // clavier
        document.addEventListener("keydown", (e) => {
            if (!lightbox.classList.contains("show")) return;
            if (e.key === "ArrowRight") showNext();
            if (e.key === "ArrowLeft") showPrev();
            if (e.key === "Escape") closeLightbox();
        });

        // refresh images si resize (rare, mais safe)
        window.addEventListener("resize", () => {
            galleryImages = Array.from(gallery.querySelectorAll(".gallery-item img"));
        });
    }

    // ---------- CAROUSEL (VISUELS) ----------
    const track = document.querySelector(".carousel-track");
    const nextBtn = document.querySelector(".carousel-btn.next");
    const prevBtn = document.querySelector(".carousel-btn.prev");

    if (track && nextBtn && prevBtn) {
        const carousel = track.closest(".carousel");
        const slides = Array.from(track.querySelectorAll(".carousel-item"));
        let slideIndex = 0;

        function getStepPx() {
            if (!slides.length) return 0;
            const slideWidth = slides[0].getBoundingClientRect().width;
            const gap = parseFloat(getComputedStyle(track).gap) || 0;
            return slideWidth + gap;
        }

        function updateCarousel() {
            if (!slides.length || !carousel) return;

            const step = getStepPx();
            const slideWidth = slides[0].getBoundingClientRect().width;
            const carouselWidth = carousel.getBoundingClientRect().width;

            const centerOffset = (carouselWidth - slideWidth) / 2;

            track.style.transform = `translateX(${centerOffset - slideIndex * step}px)`;
        }

        nextBtn.addEventListener("click", () => {
            slideIndex = (slideIndex + 1) % slides.length;
            updateCarousel();
        });

        prevBtn.addEventListener("click", () => {
            slideIndex = (slideIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        });

        window.addEventListener("resize", updateCarousel);
        updateCarousel();
    }
    /* =========================
       PODCAST EPISODES (optionnel)
    ========================= */
    const episodesContainer = document.getElementById("podcast-episodes");

    if (episodesContainer) {
        const episodes = [
            {
                title: "Épisode 01 — Titre de l’épisode",
                date: "2026-02-01",
                duration: "45 min",
                desc: "Petit résumé : de quoi on parle, pourquoi c’est cool, et ce que l’auditeur va apprendre.",
                thumb: "imgs/podcast/ep01.jpg",
                audio: "audio/podcast/ep01.mp3",
            },
            {
                title: "Épisode 02 — Titre de l’épisode",
                date: "2026-03-01",
                duration: "52 min",
                desc: "Résumé court de l’épisode.",
                thumb: "imgs/podcast/ep02.jpg",
                audio: "audio/podcast/ep02.mp3",
            },
        ];

        episodesContainer.innerHTML = episodes.map(ep => `
        <article class="episode-card">
            <img class="episode-thumb" src="${ep.thumb}" alt="Vignette ${ep.title}">
            <div class="episode-body">
                <h4 class="episode-title">${ep.title}</h4>
                <p class="episode-meta">Publié le ${ep.date} • ${ep.duration}</p>
                <p class="episode-desc">${ep.desc}</p>
                <audio class="episode-audio" controls preload="none">
                    <source src="${ep.audio}" type="audio/mpeg">
                    Ton navigateur ne supporte pas l’audio.
                </audio>
            </div>
        </article>
    `).join("");
    }

});
