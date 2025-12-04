"use strict";
class Polygone extends Forme {
    constructor(x, y, r, n, a0) {
        super(x, y);
        this.r = r;
        this.n = n;
        this.a0 = a0;
    }
    tracer(canvas) {
        let x0 = this.x_ + this.r * Math.cos(this.a0);
        let y0 = this.y_ + this.r * Math.sin(this.a0);
        let a = 2 * Math.PI / this.n;
        let context = canvas.getContext("2d");
        context.lineWidth = this.epaisseur;
        context.strokeStyle = this.couleurTrait;
        context.fillStyle = this.couleurPlein;
        context.beginPath();
        context.moveTo(x0, y0);
        for (let i = 1; i <= this.n; i++) {
            let xi = this.x_ + this.r * Math.cos(a * i + this.a0);
            let yi = this.y_ + this.r * Math.sin(a * i + this.a0);
            context.lineTo(xi, yi);
        }
        context.lineTo(x0, y0);
        context.stroke();
        context.fill();
    }
}
