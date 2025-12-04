class Perso extends Sprite
{
  public scene : Jeu;
  public px: number;
  public py : number;



  constructor(element : HTMLElement, scene : Jeu, ligne : number, colonne : number)
  {
    super(element);
    this.scene = scene;
    this.px = colonne;
    this.py = ligne;
  }


  public haut()
  {

  }

  public bas()
  {

  }

  public gauche()
  {

  }

  public droite()
  {

  }

  public animer()
  {

  }

  public figer()
  {

  }

  public manger()
  {
    
  }
}