document.addEventListener("DOMContentLoaded", () => {
    const ball = document.querySelector(".neon-ball");

    // Ajoute un petit effet "mouvement" au survol
    ball.addEventListener("mousemove", (e) => {
        const rect = ball.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        ball.style.transform = `translate(${x / 10}px, ${y / 10}px) scale(1.2)`;
    });

    ball.addEventListener("mouseleave", () => {
        ball.style.transform = "translate(0,0) scale(1)";
    });

    console.log("Page Audiovisuel - effet néon actif ");
});
