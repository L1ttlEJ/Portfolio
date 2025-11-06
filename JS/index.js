// Script pour de futures animations ou interactions
document.addEventListener("DOMContentLoaded", () => {
    console.log("Portfolio chargé avec succès !");
});



/*//////////////////////////////////*/
document.addEventListener("DOMContentLoaded", () => {
    console.log("Portfolio chargé avec succès !");

    // Apparition fluide de la section principale
    const hero = document.querySelector('.hero');
    setTimeout(() => {
        hero.classList.add('visible');
    }, 300); // petit délai pour un effet plus naturel

    // Effet "machine à écrire" sur le titre
    const title = document.getElementById('hero-title');
    const fullText = "Johannes Ibrahim Portfolio";
    title.textContent = "";
    let i = 0;

    function typeEffect() {
        if (i < fullText.length) {
            title.textContent += fullText.charAt(i);
            i++;
            setTimeout(typeEffect, 80);
        } else {
            title.style.borderRight = "none";
        }
    }
    setTimeout(typeEffect, 800); // démarrage après fade-in
});
