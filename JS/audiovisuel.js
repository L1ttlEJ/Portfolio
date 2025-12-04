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
    const gallery = document.getElementById("gallery-3d");
    if (!gallery) return; // si la galerie n'existe pas, on arrête ici

    // on sélectionne les images *après* le DOM complet
    let images = Array.from(gallery.querySelectorAll(".gallery-item img"));

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
        if (!images.length) return;
        currentIndex = index;
        const src = images[currentIndex].getAttribute("src");
        const alt = images[currentIndex].getAttribute("alt") || "";
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightbox.classList.add("show");
        // lock scroll
        document.documentElement.style.overflow = "hidden";
    }

    function closeLightbox() {
        lightbox.classList.remove("show");
        lightboxImg.src = "";
        document.documentElement.style.overflow = "";
    }

    function showNext() {
        if (!images.length) return;
        currentIndex = (currentIndex + 1) % images.length;
        openLightbox(currentIndex);
    }

    function showPrev() {
        if (!images.length) return;
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        openLightbox(currentIndex);
    }

    // listener : clic sur vignette (delegation)
    gallery.addEventListener("click", (e) => {
        const img = e.target.closest(".gallery-item img");
        if (!img) return;
        images = Array.from(gallery.querySelectorAll(".gallery-item img")); // refresh
        const index = images.indexOf(img);
        if (index >= 0) openLightbox(index);
    });

    // boutons lightbox
    closeBtn.addEventListener("click", closeLightbox);
    arrowLeft.addEventListener("click", (e) => { e.stopPropagation(); showPrev(); });
    arrowRight.addEventListener("click", (e) => { e.stopPropagation(); showNext(); });

    // clic en dehors du contenu ferme
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

    // gestion du redimensionnement : on rafraîchit images (au cas où)
    window.addEventListener("resize", () => {
        images = Array.from(gallery.querySelectorAll(".gallery-item img"));
    });

});
