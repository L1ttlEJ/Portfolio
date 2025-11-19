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
    //  GESTION DES ONGLETS (Musée / Édition / Plante)
    // =========================================================
    const tabButtons = document.querySelectorAll('.av-btn');
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
    showTab("d3");
});
