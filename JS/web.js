const iframeSelect = document.getElementById('iframe-size');
const iframeWrapper = document.querySelector('.iframe-wrapper');

iframeSelect.addEventListener('change', (e) => {
    iframeWrapper.style.width = e.target.value + '%';
});



// === Sélection des éléments ===
const buttons = document.querySelectorAll('.web-btn');
const contents = document.querySelectorAll('.content');

// === Fonction pour afficher le bon contenu ===
function showContent(id) {
    // Cacher toutes les sections
    contents.forEach(content => content.classList.remove('active'));

    // Activer la section correspondante
    const activeContent = document.getElementById(id);
    if (activeContent) {
        activeContent.classList.add('active');
    }

    // Gérer l'état visuel des boutons
    buttons.forEach(btn => {
        if (btn.dataset.target === id) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// === Gestion des clics sur les boutons ===
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        showContent(btn.dataset.target);
    });
});

// === Par défaut : afficher la première section (Musée Albert Londres) ===
window.addEventListener('DOMContentLoaded', () => {
    const defaultId = "musee";
    showContent(defaultId);
});


// === Carrousel Albert Londres (corrigé & optimisé) ===

// On attend le chargement DOM + des images
window.addEventListener("load", () => {
    const track = document.querySelector('.carousel-track');
    const images = document.querySelectorAll('.carousel-img');
    const prev = document.querySelector('.carousel-btn.prev');
    const next = document.querySelector('.carousel-btn.next');

    if (!track || !images.length || !prev || !next) return;

    let index = 0;

    // Applique la bonne translation
    function updateCarousel() {
        const width = images[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${index * width}px)`;
    }

    // Transition fluide
    track.style.transition = "transform 0.4s ease-in-out";

    next.addEventListener("click", () => {
        index = (index + 1) % images.length;
        updateCarousel();
    });

    prev.addEventListener("click", () => {
        index = (index - 1 + images.length) % images.length;
        updateCarousel();
    });

    // Recalcul si la fenêtre est redimensionnée
    window.addEventListener("resize", () => {
        updateCarousel();
    });

    updateCarousel(); // première mise en page
});


// === Contrôle de la taille de l'iframe ===
document.addEventListener("DOMContentLoaded", () => {
    const iframe = document.querySelector(".iframe-container iframe");
    const select = document.getElementById("iframe-size");

    if (iframe && select) {
        select.addEventListener("change", () => {
            const value = select.value;
            iframe.style.width = `${value}%`;

            // dézoom proportionnel léger selon la taille choisie
            const scaleMap = {
                50: 0.95,
                60: 1
            };
            iframe.style.transform = `scale(${scaleMap[value]})`;
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("open");
        navLinks.classList.toggle("open");
    });
});

