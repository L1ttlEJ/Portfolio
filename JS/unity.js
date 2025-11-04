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
