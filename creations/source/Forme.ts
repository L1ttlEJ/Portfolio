class Forme
{
  public x_ : number ;
  public y_ : number ;
  public epaisseur : number;
  public couleurTrait : string;
  public couleurPlein : string;

  public constructor(x : number, y : number)
  {
    this.x_ = x;
    this.y_ = y;
    this.epaisseur = 4;
    this.couleurTrait = "#FFD70C";
    this.couleurPlein = "#9157C1";

  }


  public tracer (canvas : HTMLCanvasElement)
  {

  }

  public translater (cx : number, cy :  number)
  {
    this.x_ += cx;
    this.y_ += cy;
  }
}