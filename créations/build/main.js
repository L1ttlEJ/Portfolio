"use strict";
let formes;
let toile;
function demarrer() {
    let nom = "World";
    console.log("Hello " + nom + " !");
    toile = document.getElementById("toile");
    let boite = toile.getBoundingClientRect();
    toile.width = boite.width;
    toile.height = boite.height;
    let r1 = new Rectangle(50, 75, 100, 150);
    let r2 = new Rectangle(300, 450, 200, 120);
    let p1 = new Polygone(180, 280, 20, 10, 15);
    let p2 = new Polygone(380, 280, 20, 10, 15);
    formes = [r1, r2, p1, p2];
    for (let forme of formes)
        forme.tracer(toile);
}
function translater(x, y) {
    let contexte = toile.getContext("2d");
    contexte.clearRect(0, 0, toile.width, toile.height);
    for (let forme of formes)
        forme.translater(x, y);
    for (let forme of formes)
        forme.tracer(toile);
}
