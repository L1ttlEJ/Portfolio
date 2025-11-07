document.addEventListener("DOMContentLoaded", () => {
    const progressText = document.getElementById("progress");
    const fill = document.querySelector(".progress-fill");
    let progress = 0;

    // Animation "jeu" du chargement jusqu'à 30%
    const loading = setInterval(() => {
        if (progress < 30) {
            progress++;
            fill.style.width = `${progress}%`;
            progressText.textContent = `${progress}%`;
        } else {
            clearInterval(loading);
        }
    }, 50);
});
