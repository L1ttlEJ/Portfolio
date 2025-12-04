"use strict";
class Insecte extends Sprite {
    constructor(element, x, y, cible, degat) {
        super(element);
        this.vx = 0;
        this.vy = 0;
        this.estMort = false;
        this.timerAnimation_ = 0;
        this.setImage("Insecte.png", 40, 40);
        this.setX(x);
        this.setY(y);
        this.cibleI = cible;
        this.dommageI = degat;
    }
    getXI() {
        return this.xI;
    }
    getYI() {
        return this.yI;
    }
    getVitesse() {
        return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    }
    getCible() {
        return this.cibleI;
    }
    getDommage() {
        return this.dommageI;
    }
    getEstMort() {
        return this.estMort;
    }
    setCible(cible) {
        this.cibleI = cible;
    }
    setEstMort(statu) {
        this.estMort = statu;
    }
    setDommage(dommage) {
        this.dommageI = dommage;
    }
    PrepaBougerInsecte() {
        let xP = this.pot.getX() + (this.pot.getWidth() / 2);
        let yP = this.pot.getY() + (this.pot.getHeight() / 2);
        if (this.getX() == xP && this.getY() == yP) {
            this.figerInsecte();
            setInterval(() => { if (this.getEstMort() !== true) {
                this.attaque(this.pot);
            } }, 1500);
        }
        else {
            let xI = this.getX();
            let yI = this.getY();
            let dx = xP - xI;
            let dy = yP - yI;
            let d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            this.vx = dx / d;
            this.vy = dy / d;
            let nx = Math.round(this.getX() + this.vx);
            let ny = Math.round(this.getY() + this.vy);
            this.setXY(nx, ny);
        }
    }
    animer(pot) {
        this.pot = pot;
        this.timerAnimation_ = setInterval(() => { this.PrepaBougerInsecte(); }, 1000 / 69);
    }
    figerInsecte() {
        clearInterval(this.timerAnimation_);
    }
    attaque(pot) {
        this.pot = pot;
        let degat = pot.getTimer() - this.getDommage();
        this.pot.setTimer(degat);
    }
}
