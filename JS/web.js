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
    //  GESTION DES ONGLETS (Musée / Édition limitée / Plante)
    // =========================================================
    const buttons = document.querySelectorAll('.web-btn');
    const contents = document.querySelectorAll('.content');

    function showContent(id) {
        contents.forEach(content => {
            content.classList.toggle("active", content.id === id);
        });

        buttons.forEach(btn => {
            btn.classList.toggle("active", btn.dataset.target === id);
        });
    }

    // Clics sur les onglets
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            showContent(btn.dataset.target);
        });
    });

    // Onglet par défaut
    showContent("musee");


    // =========================================================
    //  CONTRÔLE DE LA TAILLE DE L'IFRAME (ÉDITION LIMITÉE)
    // =========================================================
    const iframeSelect = document.getElementById('iframe-size');
    const iframeWrapper = document.querySelector('.iframe-wrapper');

    if (iframeSelect && iframeWrapper) {

        iframeSelect.addEventListener('change', (e) => {
            const value = e.target.value;
            iframeWrapper.style.width = value + "%";

            // Petit dézoom s’adapte à la taille
            const scaleMap = {
                50: "0.95",
                60: "1",
                80: "1"
            };
            iframeWrapper.querySelector("iframe").style.transform =
                `scale(${scaleMap[value] || 1})`;
        });
    }


    // =========================================================
    //  CONTRÔLE DE LA TAILLE DE L'IFRAME FIGMA (MUSÉE)
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
//  CARROUSEL ALBERT LONDRES (au chargement complet des images)
// =========================================================
window.addEventListener("load", () => {

    const track = document.querySelector('.carousel-track');
    const images = document.querySelectorAll('.carousel-img');
    const prev = document.querySelector('.carousel-btn.prev');
    const next = document.querySelector('.carousel-btn.next');

    if (!track || !images.length || !prev || !next) return;

    let index = 0;

    function updateCarousel() {
        const width = images[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${index * width}px)`;
    }

    next.addEventListener("click", () => {
        index = (index + 1) % images.length;
        updateCarousel();
    });

    prev.addEventListener("click", () => {
        index = (index - 1 + images.length) % images.length;
        updateCarousel();
    });

    window.addEventListener("resize", updateCarousel);

    updateCarousel();
});
