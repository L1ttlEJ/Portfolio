class Polygone extends Forme
{
  public r : number;
  public n : number ;
  public a0 : number ;

  public constructor(x : number, y : number, r : number, n : number, a0 : number)
{
  super(x,y);
  this.r = r;
  this.n = n;
  this.a0 = a0;
}


  public override tracer (canvas : HTMLCanvasElement)
  {
    let x0 : number = this.x_ + this.r * Math.cos(this.a0);
  let y0 : number = this.y_ + this.r * Math.sin(this.a0);
  let a : number = 2*Math.PI / this.n;




  let context : CanvasRenderingContext2D = canvas.getContext("2d");
    context.lineWidth = this.epaisseur ;
    context.strokeStyle = this.couleurTrait;
    context.fillStyle = this.couleurPlein;


  context.beginPath();
  context.moveTo(x0,y0);

  for ( let i = 1; i <= this.n ; i++)
  {
    let xi : number = this.x_ + this.r * Math.cos(a*i + this.a0);
    let yi : number = this.y_+ this.r * Math.sin(a*i + this.a0);
    context.lineTo(xi,yi);
  }

  context.lineTo(x0,y0);

  context.stroke();
  context.fill();
  }
}