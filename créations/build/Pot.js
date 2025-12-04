"use strict";
class Pot extends Sprite {
    constructor(element, numP, Numetat, cote, x, y, barreTimer) {
        super(element);
        this.numP = numP;
        this.Numetat = Numetat;
        this.timer = 60;
        this.setImage(`Pot${Numetat}.png`, cote, cote);
        this.setX(x);
        this.setY(y);
        this.barreTimer = barreTimer;
        this.startTimer();
    }
    getEtat() {
        return this.Numetat;
    }
    getNumeroPot() {
        return this.numP;
    }
    getNumerar() {
        return this.Numetat;
    }
    getTimer() {
        return this.timer;
    }
    setEtat(Numetat) {
        this.Numetat = Numetat;
        this.setImage(`Pot${Numetat}.png`, this.getWidth(), this.getHeight());
    }
    setTimer(newTimer) {
        if (newTimer >= 0 && newTimer <= 60) {
            this.timer = newTimer;
            this.MAJPot();
            this.MAJlargeurBarre();
        }
        else {
        }
    }
    startTimer() {
        setInterval(() => {
            if (this.timer > 0) {
                this.timer--;
                this.MAJPot();
                this.MAJlargeurBarre();
            }
            else {
            }
        }, 1000);
    }
    MAJPot() {
        if (this.timer >= 40 && this.timer <= 60) {
            this.setEtat(1);
        }
        else if (this.timer >= 20 && this.timer < 40) {
            this.setEtat(2);
        }
        else if (this.timer > 0 && this.timer < 20) {
            this.setEtat(3);
        }
        else {
            this.setEtat(4);
        }
    }
    MAJlargeurBarre() {
        let pourcentageRestant = (this.getTimer() / 60) * 100;
        let nouvelleLargeur = (pourcentageRestant / 100) * 100;
        this.barreTimer.setWidth(nouvelleLargeur);
    }
}
