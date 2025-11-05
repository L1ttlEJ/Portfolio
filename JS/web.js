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
