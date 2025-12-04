class Rectangle extends Forme
{
  public l_ : number ;
  public h_ : number ;


public constructor(x : number, y : number,largeur : number, hauteur : number)
{
  super(x,y);
  this.l_ = largeur;
  this.h_ = hauteur;
}

public override tracer (canvas : HTMLCanvasElement)
  {

    let context : CanvasRenderingContext2D = canvas.getContext("2d");


    context.lineWidth = this.epaisseur ;
    context.strokeStyle = this.couleurTrait;
    context.fillStyle = this.couleurPlein;

    context.beginPath();

    context.moveTo( this.x_,this.y_);
    context.lineTo( this.x_+this.l_,this.y_);
    context.lineTo( this.x_+this.l_,this.y_+this.h_ );
    context.lineTo( this.x_,this.y_+this.h_ );
    context.lineTo( this.x_,this.y_);
    context.lineTo( this.x_+this.l_,this.y_);


    context.stroke();
    context.fill();

  }

}