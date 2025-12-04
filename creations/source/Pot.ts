class Pot extends Sprite
{

  private jeu : Jeu;
  private numP : number;
  private Numetat: number;
  public timer: number; // Timer pour ce pot
  public x : number;
  public y : number;
  public barreTimer : BarreTimer;

  private timerPot : number;

  constructor(element: HTMLElement, numP :  number, Numetat: number, cote: number, x: number, y: number , barreTimer: BarreTimer)
  {
    super(element);
    this.numP = numP;
    this.Numetat = Numetat;
    this.timer = 60; // Initialisation du timer à valeur choisi
    this.setImage(`Pot${Numetat}.png`, cote, cote);
    this.setX(x);
    this.setY(y);
    this.barreTimer = barreTimer;
    this.startTimer(); // Démarrage du timer
  }



  public getEtat()
  {
    return this.Numetat;
  }

  public getNumeroPot()
  {
    return this.numP;
  }

  public getNumerar()
  {
    return this.Numetat;
  }


  public getTimer()
  {
    return this.timer;
  }

  public setEtat(Numetat: number)
  {
    this.Numetat = Numetat;
    this.setImage(`Pot${Numetat}.png`, this.getWidth(), this.getHeight());
  }



  public setTimer(newTimer: number)
  {
    if (newTimer >= 0 && newTimer <= 60)
    {
      this.timer = newTimer;
      this.MAJPot();// Mettre à jour l'état du pot après la modification du timer
      this.MAJlargeurBarre(); // Mettre à jour la barre
    }
    else
    {

    }
  }



  public startTimer()
  {
    setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
        this.MAJPot();
        this.MAJlargeurBarre();
      }
      else
      {
        // rien
      }
    }, 1000);
  }

  // Méthode pour mettre à jour l'état du pot en fonction du timer
  // on return un numero qui sera la pour compléter le nom de l'image de mon pot
  private MAJPot()
  {
    if (this.timer >= 40 && this.timer <= 60)
    {
      this.setEtat(1); // Bon
    }
    else if (this.timer >= 20 && this.timer < 40)
    {
      this.setEtat(2); // Moyen
    }
    else if (this.timer > 0 && this.timer < 20)
    {
      this.setEtat(3); // Mauvais
    }

    else
    {
      this.setEtat(4); // Mort
      //alert("Vous avez laissé fanner une fleur ! Vous avez perdu !");
    }
  }


  public MAJlargeurBarre()
  {
    let pourcentageRestant = (this.getTimer() / 60) * 100;
    let nouvelleLargeur = (pourcentageRestant / 100) * 100;

    this.barreTimer.setWidth(nouvelleLargeur);

  }


}
