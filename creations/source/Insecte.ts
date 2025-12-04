class Insecte extends Sprite
{

  private xI : number ;
  private yI : number ;

  private vx : number = 0;
  private vy : number = 0;

  private cibleI : number;
  private dommageI : number;

  private pot : Pot;

  private estMort : boolean = false;

  public timerAnimation_ : number = 0;

  constructor( element : HTMLElement, x :number , y : number , cible : number , degat : number )
  {
    super(element);
    this.setImage("Insecte.png", 40, 40);
    this.setX(x);
    this.setY(y);
    this.cibleI = cible;
    this.dommageI = degat;
  }

  public getXI()
  {
    return this.xI;
  }

  public getYI()
  {
    return this.yI;
  }

  public getVitesse()
  {
    return Math.sqrt(this.vx*this.vx + this.vy*this.vy);
  }

  public getCible()
  {
    return this.cibleI;
  }

  public getDommage()
  {
    return this.dommageI;
  }

  public getEstMort()
  {
    return this.estMort;
  }

  public setCible( cible : number )
  {
    this.cibleI = cible;
  }

  public setEstMort( statu : boolean )
  {
    this.estMort = statu;
  }

  public setDommage(dommage: number)
  {
    this.dommageI = dommage;
  }



  public PrepaBougerInsecte( )
  {

    let xP : number = this.pot.getX() + (this.pot.getWidth() / 2);
    let yP : number = this.pot.getY() + (this.pot.getHeight() / 2) ;
    if ( this.getX() == xP && this.getY() == yP )
    {
      //console.log("Arrivé");
        this.figerInsecte();
        setInterval(() => { if (this.getEstMort() !== true){this.attaque(this.pot);} }, 1500);
    }
    else
    {


    let xI = this.getX();
    let yI = this.getY();


    let dx =xP - xI;
    let dy =yP - yI;

    let d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

    this.vx = dx / d ;
    this.vy = dy / d ;

    let nx = Math.round(this.getX() + this.vx) ;
    let ny = Math.round(this.getY() + this.vy) ;

    this.setXY(nx,ny);

    }
    //console.log("Position insecte :"+this.getX() + ";" + this.getY() );
    //console.log("Position Pot :"+this.pot.getX() + ";" + this.pot.getY() );
  }

  public animer(pot : Pot)
  {
    this.pot = pot;
    this.timerAnimation_ = setInterval(() => { this.PrepaBougerInsecte(); }, 1000/69);

  }

  public figerInsecte()
  {
    clearInterval(this.timerAnimation_);
  }



  public attaque(pot : Pot)
  {
      this.pot = pot
      let degat =  pot.getTimer() - this.getDommage();
      this.pot.setTimer(degat);
  }


}