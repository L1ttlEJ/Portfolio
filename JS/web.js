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


// === Carrousel Albert Londres ===
const carouselTrack = document.querySelector('.carousel-track');
const carouselImages = document.querySelectorAll('.carousel-img');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let currentIndex = 0;

function updateCarousel() {
    const width = carouselImages[0].clientWidth;
    carouselTrack.style.transform = `translateX(-${currentIndex * width}px)`;
}

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % carouselImages.length;
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
    updateCarousel();
});

window.addEventListener('resize', updateCarousel);


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
