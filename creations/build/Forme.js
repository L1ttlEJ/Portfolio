"use strict";
class Forme {
    constructor(x, y) {
        this.x_ = x;
        this.y_ = y;
        this.epaisseur = 4;
        this.couleurTrait = "#FFD70C";
        this.couleurPlein = "#9157C1";
    }
    tracer(canvas) {
    }
    translater(cx, cy) {
        this.x_ += cx;
        this.y_ += cy;
    }
}
