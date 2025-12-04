// JS complet pour audiovisuels : onglets + galerie/lightbox
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
    const tabButtons = document.querySelectorAll('.av-btn');
    const tabContents = document.querySelectorAll('.content');

    function showTab(id) {
        tabContents.forEach(section => {
            section.classList.toggle("active", section.id === id);
        });
        tabButtons.forEach(btn => {
            btn.classList.toggle("active", btn.dataset.target === id);
        });
        // scroll to top of section smoothly on mobile/long pages
        const active = document.getElementById(id);
        if (active) active.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            showTab(btn.dataset.target);
        });
    });

    // Onglet par défaut
    showTab("d3");

    // ---------- LIGHTBOX / GALLERY ----------
    const galleries = [
        document.getElementById("gallery-3d"),
        document.getElementById("gallery-visuels")
    ].filter(g => g);
    if (!gallery) return; // si la galerie n'existe pas, on arrête ici

    document.addEventListener("DOMContentLoaded", () => {

        const galleries = Array.from(document.querySelectorAll(".gallery-visuels"));

        // création lightbox unique
        const lightbox = document.createElement("div");
        lightbox.id = "lightbox-visuels";
        lightbox.innerHTML = `
        <div class="lightbox-content-visuels">
            <span class="lightbox-close-visuels">&times;</span>
            <img class="lightbox-img-visuels" src="" alt="">
            <div class="lightbox-arrow-visuels left">&#10094;</div>
            <div class="lightbox-arrow-visuels right">&#10095;</div>
        </div>
    `;
        document.body.appendChild(lightbox);

        const lightboxImg = lightbox.querySelector(".lightbox-img-visuels");
        const closeBtn = lightbox.querySelector(".lightbox-close-visuels");
        const arrowLeft = lightbox.querySelector(".lightbox-arrow-visuels.left");
        const arrowRight = lightbox.querySelector(".lightbox-arrow-visuels.right");

        let images = [];
        let currentIndex = 0;

        function openLightbox(index) {
            currentIndex = index;
            const img = images[currentIndex];
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt || "";
            lightbox.classList.add("show");
            document.documentElement.style.overflow = "hidden";
        }

        function closeLightbox() {
            lightbox.classList.remove("show");
            lightboxImg.src = "";
            document.documentElement.style.overflow = "";
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % images.length;
            openLightbox(currentIndex);
        }

        function showPrev() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            openLightbox(currentIndex);
        }

        galleries.forEach(gallery => {
            gallery.addEventListener("click", (e) => {
                const img = e.target.closest("img");
                if (!img) return;
                images = Array.from(gallery.querySelectorAll("img"));
                const index = images.indexOf(img);
                if (index >= 0) openLightbox(index);
            });
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

    });
