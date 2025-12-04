"use strict";
class Spray extends Sprite {
    constructor(element, coordX, coordY) {
        super(element);
        this.coordX = coordX;
        this.coordY = coordY;
        this.setX(coordX);
        this.setY(coordY);
    }
    getCoordX() {
        return this.coordX;
    }
    getCoordY() {
        return this.coordY;
    }
    setCoordX(coordX) {
        this.coordX = coordX;
        this.setX(coordX);
    }
    setCoordY(coordY) {
        this.coordY = coordY;
        this.setY(coordY);
    }
}
