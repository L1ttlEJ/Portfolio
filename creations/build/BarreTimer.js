"use strict";
class BarreTimer extends Sprite {
    constructor(element, x, y, pourcentage) {
        super(element);
        this.setImage("barreProg.png", 100, 10);
        this.setX(x);
        this.setY(y);
    }
    getPourcentage() {
        return this.pourcentage;
    }
    setPourcentage(pourcentage) {
        this.pourcentage = pourcentage;
    }
}
