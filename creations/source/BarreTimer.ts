class BarreTimer extends Sprite
{
  public scene : Jeu;
  private x : number;
  private y : number;
  private pourcentage : number;

  constructor(element: HTMLElement, x: number, y: number, pourcentage : number)
  {
    super(element);
    this.setImage("barreProg.png", 100, 10);
    this.setX(x);
    this.setY(y);
  }


  public getPourcentage()
  {
    return this.pourcentage;
  }


  public setPourcentage( pourcentage : number)
  {
    this.pourcentage = pourcentage;
  }


}