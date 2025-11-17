// =========================================================
//  INITIALISATION GLOBALE
// =========================================================
document.addEventListener("DOMContentLoaded", () => {

    console.log("Portfolio Web chargé !");

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
    //  GESTION DES ONGLETS (Musée / Édition / Plante)
    // =========================================================
    const tabButtons = document.querySelectorAll('.web-btn');
    const tabContents = document.querySelectorAll('.content');

    function showTab(id) {

        // Affichage / masquage des sections
        tabContents.forEach(section => {
            if (section.id === id) {
                section.classList.add("active");
                section.style.display = "block";
            } else {
                section.classList.remove("active");
                section.style.display = "none";
            }
        });

        // Activation visuelle des boutons
        tabButtons.forEach(btn => {
            btn.classList.toggle("active", btn.dataset.target === id);
        });
    }

    // Clics
    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            showTab(btn.dataset.target);
        });
    });

    // Onglet par défaut
    showTab("musee");

    // =========================================================
    //  CONTRÔLE IFRAME (ÉDITION LIMITÉE)
    // =========================================================
    const iframeSelect = document.getElementById('iframe-size');
    const iframeWrapper = document.querySelector('.iframe-wrapper');

    if (iframeSelect && iframeWrapper) {
        iframeSelect.addEventListener('change', (e) => {
            const value = e.target.value;
            iframeWrapper.style.width = value + "%";

            const scaleMap = {
                50: "0.95",
                60: "1",
                80: "1"
            };

            const iframe = iframeWrapper.querySelector("iframe");
            if (iframe) iframe.style.transform = `scale(${scaleMap[value] || 1})`;
        });
    }

    // =========================================================
    //  CONTRÔLE IFRAME FIGMA (MUSÉE)
    // =========================================================
    const figmaSelect = document.getElementById('figmaSize');
    const figmaIframe = document.querySelector('.figma-container iframe');

    if (figmaSelect && figmaIframe) {
        figmaSelect.addEventListener("change", () => {
            figmaIframe.style.width = figmaSelect.value + "%";
        });
    }
});


// =========================================================
//  CARROUSEL (images chargées)
// =========================================================
window.addEventListener("load", () => {

    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-img'));
    const prev = document.querySelector('.carousel-btn.prev');
    const next = document.querySelector('.carousel-btn.next');

    if (!track || slides.length === 0) return;

    let index = 0;

    function getSlideWidth() {
        return slides[0].clientWidth;
    }

    function updateCarousel() {
        const width = getSlideWidth();
        track.style.transform = `translateX(-${index * width}px)`;
    }

    // Correction : recalcul quand les images finissent de charger
    slides.forEach(img => img.addEventListener("load", updateCarousel));

    next.addEventListener("click", () => {
        index = (index + 1) % slides.length;
        updateCarousel();
    });

    prev.addEventListener("click", () => {
        index = (index - 1 + slides.length) % slides.length;
        updateCarousel();
    });

    // Recalcule sur resize
    window.addEventListener("resize", updateCarousel);

    updateCarousel();
});

