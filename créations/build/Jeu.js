"use strict";
class Jeu extends Scene {
    constructor(element) {
        super(element, false);
        this.insectes = [];
        this.totalTime = 120;
        this.nbPot = 0;
        this.timerElement = document.getElementById("timer");
        this.feuille1 = document.getElementById("feuille");
        this.feuille2 = document.getElementById("feuilles2");
    }
    start() {
        super.start();
        this.coteP = 100;
        this.InitialiseCarte();
        this.dessinerJardin();
        this.ajouterSprayEau();
        setInterval(() => { this.ajouterInsecte(); }, 1500);
        this.currentSpray = this.sprayEau;
        this.EcouteurClient();
        this.startTimer();
        this.clickDesFeuilles();
    }
    clickDesFeuilles() {
        this.feuille1.addEventListener("click", () => {
            this.feuille2.style.display = "block";
            this.pause();
        });
        this.feuille2.addEventListener("click", () => {
            this.feuille2.style.display = "none";
            this.unpause();
        });
    }
    startTimer() {
        this.MAJtimerJeu();
        this.timerInterval = setInterval(() => {
            if (this.totalTime > 0) {
                this.totalTime--;
                this.MAJtimerJeu();
            }
            else {
                clearInterval(this.timerInterval);
                alert("Temps écoulé !");
            }
        }, 1000);
    }
    MAJtimerJeu() {
        this.timerElement.innerText = this.totalTime + "";
    }
    pause() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    }
    unpause() {
        this.startTimer();
    }
    clean() {
    }
    InitialiseCarte() {
        this.carte = [[1, 1],
            [1, 1]];
    }
    dessinerJardin() {
        this.pots = [];
        let sceneWidth = this.getWidth();
        let sceneHeight = this.getHeight();
        let numP = 0;
        for (let i = 0; i < this.carte.length; i++) {
            this.pots[i] = [];
            for (let j = 0; j < this.carte[i].length; j++) {
                if (this.carte[i][j] == 1) {
                    let xb = ((sceneWidth - this.coteP) / 2 + j * this.coteP - this.coteP / 2);
                    let yb = ((sceneHeight - this.coteP) / 2 + i * this.coteP - this.coteP / 2) + 100;
                    this.barre = new BarreTimer(document.createElement("img"), xb, yb, 100);
                    this.appendChild(this.barre);
                    let x = (sceneWidth - this.coteP) / 2 + j * this.coteP - this.coteP / 2;
                    let y = (sceneHeight - this.coteP) / 2 + i * this.coteP - this.coteP / 2;
                    numP = numP + 1;
                    this.pot = new Pot(document.createElement("img"), numP, 1, this.coteP, x, y, this.barre);
                    this.pots[i][j] = this.pot;
                    this.appendChild(this.pot);
                    this.nbPot = this.nbPot + 1;
                }
            }
        }
    }
    ajouterSprayEau() {
        let sceneWidth = this.getWidth();
        let sceneHeight = this.getHeight();
        let sprayX = (sceneWidth - 100) / 2;
        let SprayY = sceneHeight - 100;
        let ElementSpray = document.createElement("img");
        this.sprayEau = new SprayEau(ElementSpray, sprayX, SprayY);
        this.appendChild(this.sprayEau);
        this.currentSpray = this.sprayEau;
    }
    ajouterSprayInsecte() {
        let sceneWidth = this.getWidth();
        let sceneHeight = this.getHeight();
        let sprayX = (sceneWidth - 100) / 2;
        let SprayY = sceneHeight - 100;
        let ElementSpray = document.createElement("img");
        this.sprayInsecte = new SprayInsecte(ElementSpray, sprayX, SprayY);
        this.appendChild(this.sprayInsecte);
        this.currentSpray = this.sprayInsecte;
    }
    ajouterInsecte() {
        let choix = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
        let hauteurY1 = Math.floor(Math.random() * (400 - 70 + 1)) + 70;
        let hauteurY2 = Math.floor(Math.random() * (400 - 70 + 1)) + 70;
        let numeroC = Math.floor(Math.random() * (this.nbPot - 1 + 1)) + 1;
        if (choix == 1) {
            this.insecte = new Insecte(document.createElement("img"), 20, hauteurY1, numeroC, 5);
            this.insecte.setRotation(0);
            this.appendChild(this.insecte);
            this.insectes.push(this.insecte);
            this.insecte.animer(this.trouverPotCible(numeroC));
        }
        if (choix == 2) {
            this.insecte = new Insecte(document.createElement("img"), 580, hauteurY2, numeroC, 5);
            this.insecte.setRotation(180);
            this.appendChild(this.insecte);
            this.insectes.push(this.insecte);
            this.insecte.animer(this.trouverPotCible(numeroC));
        }
    }
    trouverPotCible(cible) {
        for (let i = 0; i < this.pots.length; i++) {
            for (let j = 0; j < this.pots[i].length; j++) {
                if (cible == this.pots[i][j].getNumeroPot()) {
                    return this.pots[i][j];
                }
            }
        }
    }
    EcouteurClient() {
        window.addEventListener("keydown", this.changerSpray.bind(this));
        this.addEventListener("mousemove", this.suivreSouris.bind(this));
        this.addEventListener("click", this.utiliserSpray.bind(this));
    }
    suivreSouris(event) {
        if (this.currentSpray) {
            let souriSX = event.clientX - this.getBoundingClientRect().left;
            let sourisY = event.clientY - this.getBoundingClientRect().top;
            let sprayX = souriSX - this.currentSpray.getWidth() / 2;
            let sprayY = sourisY - (this.currentSpray.getHeight() / 3);
            this.currentSpray.setCoordX(sprayX);
            this.currentSpray.setCoordY(sprayY);
        }
    }
    utiliserSpray(event) {
        if (this.currentSpray instanceof SprayEau) {
            if (this.sprayEau !== null) {
                for (let i = 0; i < this.pots.length; i++) {
                    for (let j = 0; j < this.pots[i].length; j++) {
                        this.pot = this.pots[i][j];
                        if (this.pot !== null && this.sprayEau.getCenterX() >= this.pot.getX() &&
                            this.sprayEau.getCoordX() <= this.pot.getX() + this.pot.getWidth() &&
                            this.sprayEau.getCoordY() >= this.pot.getY() &&
                            this.sprayEau.getCoordY() <= this.pot.getY() + this.pot.getHeight()) {
                            let nouveauTimer = this.pot.getTimer() + 5;
                            this.pot.setTimer(nouveauTimer);
                            return;
                        }
                    }
                }
            }
        }
        else if (this.currentSpray instanceof SprayInsecte) {
            const clickedInsecte = this.clickInsecte(event);
            if (clickedInsecte) {
                clickedInsecte.setDommage(0);
                this.removeChild(clickedInsecte.getElement());
                const index = this.insectes.indexOf(clickedInsecte);
                if (index > -1) {
                    this.insectes.splice(index, 1);
                }
                this.insecte.setEstMort(true);
            }
        }
    }
    clickInsecte(event) {
        const clickX = event.clientX - this.getBoundingClientRect().left;
        const clickY = event.clientY - this.getBoundingClientRect().top;
        for (let insecte of this.insectes) {
            if (clickX >= insecte.getX() &&
                clickX <= insecte.getX() + insecte.getWidth() &&
                clickY >= insecte.getY() &&
                clickY <= insecte.getY() + insecte.getHeight()) {
                return insecte;
            }
        }
        return null;
    }
    changerSpray(event) {
        if (event.key === 's' || event.key === 'S') {
            if (this.currentSpray) {
                this.removeChild(this.currentSpray.getElement());
            }
            this.ajouterSprayInsecte();
        }
        else if (event.key === 'd' || event.key === 'D') {
            if (this.currentSpray) {
                this.removeChild(this.currentSpray.getElement());
            }
            this.ajouterSprayEau();
        }
    }
}
