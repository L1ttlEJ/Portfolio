"use strict";
class Rectangle extends Forme {
    constructor(x, y, largeur, hauteur) {
        super(x, y);
        this.l_ = largeur;
        this.h_ = hauteur;
    }
    tracer(canvas) {
        let context = canvas.getContext("2d");
        context.lineWidth = this.epaisseur;
        context.strokeStyle = this.couleurTrait;
        context.fillStyle = this.couleurPlein;
        context.beginPath();
        context.moveTo(this.x_, this.y_);
        context.lineTo(this.x_ + this.l_, this.y_);
        context.lineTo(this.x_ + this.l_, this.y_ + this.h_);
        context.lineTo(this.x_, this.y_ + this.h_);
        context.lineTo(this.x_, this.y_);
        context.lineTo(this.x_ + this.l_, this.y_);
        context.stroke();
        context.fill();
    }
}
