// Gestion des onglets dynamiques
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".content");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Désactiver tous les boutons
            buttons.forEach(b => b.classList.remove("active"));
            // Activer le bouton cliqué
            btn.classList.add("active");

            // Cacher tous les contenus
            contents.forEach(c => c.classList.remove("active"));
            // Afficher le bon contenu
            const target = btn.getAttribute("data-target");
            document.getElementById(target).classList.add("active");
        });
    });
});




// --- Carrousel OwenOdyssey ---
document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".carousel-track");
    const images = Array.from(document.querySelectorAll(".carousel-img"));
    const nextBtn = document.querySelector(".carousel-btn.next");
    const prevBtn = document.querySelector(".carousel-btn.prev");
    let index = 0;

    function updateCarousel() {
        const width = images[0].clientWidth;
        track.style.transform = `translateX(${-index * width}px)`;
    }

    nextBtn.addEventListener("click", () => {
        index = (index + 1) % images.length;
        updateCarousel();
    });

    prevBtn.addEventListener("click", () => {
        index = (index - 1 + images.length) % images.length;
        updateCarousel();
    });

    window.addEventListener("resize", updateCarousel);
});


// CARROUSEL Pokémon - script autonome
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('pokemon-carousel');
    if (!carousel) return; // rien à faire si pas présent

    const track = carousel.querySelector('.carousel-track');
    const imgs = Array.from(carousel.querySelectorAll('.carousel-img'));
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');

    let index = 0;
    let slideWidth = 0;

    // Attend que toutes les images du carrousel soient chargées pour calculer la largeur
    function waitImagesLoaded(images) {
        const promises = images.map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => { img.onload = img.onerror = resolve; });
        });
        return Promise.all(promises);
    }

    function updateSizes() {
        // largeur visible du carrousel (on prend le conteneur)
        slideWidth = carousel.clientWidth;
        // on force chaque image à être à la largeur du conteneur (affiche 1 image à la fois)
        imgs.forEach(img => {
            img.style.width = `${slideWidth}px`;
            img.style.minWidth = `${slideWidth}px`;
        });
        // repositionne la piste selon l'index actuel
        track.style.transform = `translateX(${-index * slideWidth}px)`;
    }

    function showNext() {
        index = (index + 1) % imgs.length;
        track.style.transform = `translateX(${-index * slideWidth}px)`;
    }

    function showPrev() {
        index = (index - 1 + imgs.length) % imgs.length;
        track.style.transform = `translateX(${-index * slideWidth}px)`;
    }

    // initialisation après chargement des images
    waitImagesLoaded(imgs).then(() => {
        updateSizes();
        // si plusieurs images et auto-fit : rien de plus
    });

    // événements boutons
    nextBtn?.addEventListener('click', showNext);
    prevBtn?.addEventListener('click', showPrev);

    // redimensionnement : recalcul des tailles
    window.addEventListener('resize', () => {
        updateSizes();
    });

    // support swipe tactile simple
    let startX = 0;
    let isDown = false;
    track.addEventListener('pointerdown', (e) => {
        isDown = true; startX = e.clientX;
        track.style.transition = 'none';
    });
    window.addEventListener('pointermove', (e) => {
        if (!isDown) return;
        const dx = e.clientX - startX;
        track.style.transform = `translateX(${-index * slideWidth + dx}px)`;
    });
    window.addEventListener('pointerup', (e) => {
        if (!isDown) return;
        isDown = false;
        track.style.transition = ''; // rétablit la transition CSS
        const dx = e.clientX - startX;
        const threshold = slideWidth * 0.15; // seuil de swipe
        if (dx < -threshold) showNext();
        else if (dx > threshold) showPrev();
        else track.style.transform = `translateX(${-index * slideWidth}px)`; // revient en place
    });

});

// === Sélection des éléments ===
const buttons = document.querySelectorAll('.unity-btn');
const contents = document.querySelectorAll('.content');
const body = document.body;

// === Audio ===
let currentAudio = null;
let isAudioInitialized = false;

// === Données de configuration ===
const pageData = {
    owen: {
        bg: "imgs/owen/backgrounds/owen-bg.jpg",
        music: "song/owen.mp3"
    },
    rise: {
        bg: "imgs/rise/backgrounds/rise-bg.jpg",
        music: "song/rise.mp3"
    },
    pokemon: {
        bg: "imgs/poke/fond.gif",
        music: "song/pokeSong.mp3"
    }
};

// === Fonction pour changer de section ===
function showContent(id) {
    // cacher toutes les sections
    contents.forEach(content => content.classList.remove('active'));
    // activer la section choisie
    document.getElementById(id).classList.add('active');

    // changer le fond
    if (pageData[id]) {
        body.style.backgroundImage = `url('${pageData[id].bg}')`;
    }

    // arrêter la musique actuelle
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    // préparer la nouvelle musique
    if (pageData[id] && pageData[id].music) {
        currentAudio = new Audio(pageData[id].music);
        currentAudio.volume = 0.4;
        currentAudio.loop = true;

        // lecture uniquement si l'utilisateur a déjà interagi
        if (isAudioInitialized) {
            currentAudio.play().catch(err => {
                console.warn("Lecture audio bloquée :", err);
            });
        }
    }
}

// === Gestion des clics sur les boutons ===
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        showContent(btn.dataset.target);
    });
});

// === Par défaut : section Pokémon ===
window.addEventListener('DOMContentLoaded', () => {
    const defaultId = "pokemon";
    document.querySelector(`.unity-btn[data-target="${defaultId}"]`).classList.add('active');
    showContent(defaultId);
});

// === Déblocage audio au premier clic utilisateur ===
document.addEventListener('click', () => {
    if (!isAudioInitialized) {
        isAudioInitialized = true;
        if (currentAudio) {
            currentAudio.play().catch(err => {
                console.warn("Lecture audio bloquée :", err);
            });
        }
    }
}, { once: true });
