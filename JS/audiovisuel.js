// JS complet : navbar + onglets + lightbox 3D + carousel
document.addEventListener("DOMContentLoaded", () => {

    console.log("Portfolio AudioVisuel chargé !");

    // ---------- NAVBAR MOBILE ----------
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("open");
            navLinks.classList.toggle("open");
        });
    }

    // ---------- ONGLETS ----------
    const tabButtons = document.querySelectorAll(".av-btn");
    const tabContents = document.querySelectorAll(".content");

    function showTab(id) {
        tabContents.forEach(section => {
            section.classList.toggle("active", section.id === id);
        });
        tabButtons.forEach(btn => {
            btn.classList.toggle("active", btn.dataset.target === id);
        });

        const active = document.getElementById(id);
        if (active) active.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => showTab(btn.dataset.target));
    });

    // Onglet par défaut
    showTab("d3");

    // ---------- LIGHTBOX / GALLERY 3D ----------
    // (si tu as mis id="gallery-3d" dans le HTML, ça marche direct)
    const gallery = document.getElementById("gallery-3d") || document.querySelector(".gallery-3d");
    if (gallery) {
        let galleryImages = Array.from(gallery.querySelectorAll(".gallery-item img"));

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

        let currentIndex = 0;

        function openLightbox(index) {
            galleryImages = Array.from(gallery.querySelectorAll(".gallery-item img"));
            if (!galleryImages.length) return;

            currentIndex = index;
            const src = galleryImages[currentIndex].getAttribute("src");
            const alt = galleryImages[currentIndex].getAttribute("alt") || "";

            lightboxImg.src = src;
            lightboxImg.alt = alt;
            lightbox.classList.add("show");

            document.documentElement.style.overflow = "hidden";
        }

        function closeLightbox() {
            lightbox.classList.remove("show");
            lightboxImg.src = "";
            document.documentElement.style.overflow = "";
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

        gallery.addEventListener("click", (e) => {
            const img = e.target.closest(".gallery-item img");
            if (!img) return;

            galleryImages = Array.from(gallery.querySelectorAll(".gallery-item img"));
            const index = galleryImages.indexOf(img);
            if (index >= 0) openLightbox(index);
        });

        closeBtn.addEventListener("click", closeLightbox);
        arrowLeft.addEventListener("click", (e) => { e.stopPropagation(); showPrev(); });
        arrowRight.addEventListener("click", (e) => { e.stopPropagation(); showNext(); });

        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener("keydown", (e) => {
            if (!lightbox.classList.contains("show")) return;
            if (e.key === "ArrowRight") showNext();
            if (e.key === "ArrowLeft") showPrev();
            if (e.key === "Escape") closeLightbox();
        });

        window.addEventListener("resize", () => {
            galleryImages = Array.from(gallery.querySelectorAll(".gallery-item img"));
        });
    }

    // ---------- CAROUSEL (VISUELS) ----------
    const track = document.querySelector(".carousel-track");
    const nextBtn = document.querySelector(".carousel-btn.next");
    const prevBtn = document.querySelector(".carousel-btn.prev");

    if (track && nextBtn && prevBtn) {
        const slides = Array.from(track.querySelectorAll(".carousel-item"));

        let slideIndex = 0;

        function updateCarousel() {
            if (!slides.length) return;

            const slideWidth = slides[0].getBoundingClientRect().width;
            const gap = parseFloat(getComputedStyle(track).gap) || 0;

            track.style.transform = `translateX(-${index * (slideWidth + gap)}px)`;
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

});
