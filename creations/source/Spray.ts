class Spray extends Sprite
{
  private coordX: number;
  private coordY: number;

  constructor(element: HTMLElement, coordX: number, coordY: number)
  {
      super(element);
      this.coordX = coordX;
      this.coordY = coordY;
      this.setX(coordX);
      this.setY(coordY);

  }

  public getCoordX(): number
  {
      return this.coordX;
  }

  public getCoordY(): number
  {
      return this.coordY;
  }


  public setCoordX(coordX: number): void
  {
      this.coordX = coordX;
      this.setX(coordX);
  }

  public setCoordY(coordY: number): void
  {
      this.coordY = coordY;
      this.setY(coordY);
  }

}
