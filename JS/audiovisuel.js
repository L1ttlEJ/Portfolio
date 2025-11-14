document.addEventListener("DOMContentLoaded", () => {
    const progressFill = document.getElementById("progress-fill");
    const progressText = document.getElementById("progress-text");

    let progress = 0;
    const target = 30; // 30%

    const interval = setInterval(() => {
        if (progress < target) {
            progress++;
            progressFill.style.width = `${progress}%`;
            progressText.textContent = `${progress}%`;
        } else {
            clearInterval(interval);
            // petit effet de glow à la fin
            progressFill.style.boxShadow = "0 0 25px #FACC15, 0 0 50px #7C3AED";
        }
    }, 60);
});



//////////////////////////////////NAV////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("open");
        navLinks.classList.toggle("open");
    });
});