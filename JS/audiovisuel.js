// =========================================================
//  INITIALISATION GLOBALE
// =========================================================
document.addEventListener("DOMContentLoaded", () => {

    console.log("Portfolio AudioVisuel chargé !");

    // =========================================================
    //  NAVBAR MOBILE
    // =========================================================
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("open");
            navLinks.classList.toggle("open");
        });
    }

    // =========================================================
    //  GESTION DES ONGLETS AUDIOVISUELS
    // =========================================================
    const tabButtons = document.querySelectorAll('.av-btn');
    const tabContents = document.querySelectorAll('.content');

    function showTab(id) {

        tabContents.forEach(section => {
            section.classList.remove("active");
            if (section.id === id) {
                section.classList.add("active");
            }
        });

        tabButtons.forEach(btn => {
            btn.classList.toggle("active", btn.dataset.target === id);
        });
    }

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            showTab(btn.dataset.target);
        });
    });

    // Onglet par défaut
    showTab("d3");
});


// =========================================================
//  LIGHTBOX / GALLERIE 3D
// =========================================================
document.addEventListener("DOMContentLoaded", () => {

    const images = document.querySelectorAll(".gallery-item img");

    // Création de la lightbox
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox-3d";
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img class="lightbox-img" src="" alt="">
            <div class="lightbox-arrow left">&#10094;</div>
            <div class="lightbox-arrow right">&#10095;</div>
        </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector(".lightbox-img");
    const closeBtn = lightbox.querySelector(".lightbox-close");
    const arrowLeft = lightbox.querySelector(".lightbox-arrow.left");
    const arrowRight = lightbox.querySelector(".lightbox-arrow.right");

    let currentIndex = 0;

    // Ouvrir la lightbox
    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = images[index].src;
        lightbox.classList.add("show");
    }

    // Fermer la lightbox
    function closeLightbox() {
        lightbox.classList.remove("show");
    }

    // Navigation flèches
    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImg.src = images[currentIndex].src;
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentIndex].src;
    }

    // Clic sur une image
    images.forEach((img, index) => {
        img.addEventListener("click", () => openLightbox(index));
    });

    // Boutons
    closeBtn.addEventListener("click", closeLightbox);
    arrowLeft.addEventListener("click", showPrev);
    arrowRight.addEventListener("click", showNext);

    // Clic extérieur
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Navigation au clavier
    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("show")) return;

        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "Escape") closeLightbox();
    });

});
