//==================================================================================================
// ANIMATION AVEC TYPESCRIPT                                                                 Jeu.ts
//==================================================================================================

// Classe  J e u //---------------------------------------------------------------------------------
class Jeu extends Scene
{
 //----------------------------------------------------------------------------------------Attributs
 /* Declarer ici les attributs de la scene. */
  private feuille1 :  HTMLElement;
  private feuille2 : HTMLElement;


 private coteP: number; // defini la taille d'un cote du pot (le pot etant un carre)
 public nbPot : number ; // défini le nombre de pot dans ma scene
 public pot : Pot;
 public barre : BarreTimer;
 public carte : Array < Array <number> >;
 private pots: Array <Array <Pot> >;


 private sprayEau : SprayEau;
 private sprayInsecte: SprayInsecte;
 private currentSpray: Spray;


 private insecte : Insecte;
 private insectes: Insecte[] = [];


 private timerElement : HTMLElement;
 private totalTime : number = 120; // 120 pour 120 secondes soit 2min
 private timerInterval: number;


 //-------------------------------------------------------------------------------------Constructeur
 public constructor(element : HTMLElement)
 {
  super(element,false);
  this.nbPot = 0;


  this.timerElement = document.getElementById("timer");

  this.feuille1 = document.getElementById("feuille");
  this.feuille2 = document.getElementById("feuilles2");
 }

 //--------------------------------------------------------------------------------------------start
 public override start()
 {
  /* Ecrire ici le code qui demarre la scene. */

  super.start();
  this.coteP = 100;



  this.InitialiseCarte();
  this.dessinerJardin();
  this.ajouterSprayEau();
  setInterval(() => { this.ajouterInsecte(); }, 1500);
  //this.ajouterInsecte();
  this.currentSpray = this.sprayEau;
  this.EcouteurClient();
  this.startTimer();
  this.clickDesFeuilles();
  }


  public clickDesFeuilles()
  {
    this.feuille1.addEventListener("click", () =>
    {
      this.feuille2.style.display = "block";
      this.pause();
    });

    this.feuille2.addEventListener("click", () =>
    {
      this.feuille2.style.display = "none";
      this.unpause();
    });
  }



  public startTimer()
  {
    this.MAJtimerJeu();
    this.timerInterval = setInterval(() =>
    {
      if (this.totalTime > 0)
      {
        this.totalTime--;
        this.MAJtimerJeu();
      }
      else
      {
        clearInterval(this.timerInterval);
        alert("Temps écoulé !");
      }
    },1000);
  }


  private MAJtimerJeu()
  {
    this.timerElement.innerText = this.totalTime + "" ;
  }



 //--------------------------------------------------------------------------------------------pause
 public override pause()
 {
  /* Ecrire ici le code qui met la scene en pause. */

  // met en pause le timer du jeu
  if (this.timerInterval)
  {
    clearInterval(this.timerInterval);
  }

  // met en pause le timer des pots



  //met en pause les insectes (les fige totalement)

  }

 //------------------------------------------------------------------------------------------unpause
 public override unpause()
 {
  /* Ecrire ici le code qui sort la scene de la pause. */

  this.startTimer();

 }

 //--------------------------------------------------------------------------------------------clean
 public override clean() {
  /* Ecrire ici le code qui nettoie la scene en vue d'un redemarrage. */
 }

 private InitialiseCarte()
 {
  this.carte = [[ 1, 1 ],
                [ 1, 1 ]]
 }

 private dessinerJardin()
 {
    this.pots = []; // Initialiser le tableau de pots
    // Calculer les dimensions de la scène
    let sceneWidth = this.getWidth();
    let sceneHeight = this.getHeight();
    let numP : number = 0;

    for (let i: number = 0; i < this.carte.length; i++)
    {
        this.pots[i] = [];
        for (let j: number = 0; j < this.carte[i].length; j++)
        {
          if (this.carte[i][j] == 1)
          {

            let xb : number = ((sceneWidth - this.coteP) / 2 + j * this.coteP - this.coteP / 2) ;
            let yb : number= ((sceneHeight - this.coteP) / 2 + i * this.coteP - this.coteP / 2) + 100;

            this.barre = new BarreTimer(document.createElement("img"),xb,yb,100);
            this.appendChild(this.barre);


            let x : number = (sceneWidth - this.coteP) / 2 + j * this.coteP - this.coteP / 2;
            let y : number= (sceneHeight - this.coteP) / 2 + i * this.coteP - this.coteP / 2;


            numP = numP + 1
            this.pot = new Pot(document.createElement("img"),numP, 1, this.coteP, x, y,this.barre);
            this.pots[i][j] = this.pot;
            this.appendChild(this.pot);



            this.nbPot = this.nbPot + 1
            }
        }
    }
  }

  private ajouterSprayEau()
  {
    // on calcul les coordonnées pour le mettre en bas au centre
    let sceneWidth = this.getWidth();
    let sceneHeight = this.getHeight();

    let sprayX : number = (sceneWidth - 100) / 2;
    let SprayY : number = sceneHeight - 100;

    // on crée notre spray
    let ElementSpray = document.createElement("img");
    this.sprayEau = new SprayEau(ElementSpray,sprayX,SprayY);

    this.appendChild(this.sprayEau);
    this.currentSpray = this.sprayEau;
  }

  private ajouterSprayInsecte()
  {
    // on calcul les coordonnées pour le mettre en bas au centre
    let sceneWidth = this.getWidth();
    let sceneHeight = this.getHeight();

    let sprayX : number = (sceneWidth - 100) / 2;
    let SprayY : number = sceneHeight - 100;

    // on crée notre spray
    let ElementSpray = document.createElement("img");
    this.sprayInsecte = new SprayInsecte(ElementSpray,sprayX,SprayY);

    this.appendChild(this.sprayInsecte);
    this.currentSpray = this.sprayInsecte;
  }



  private ajouterInsecte()
  {

    // choix entre 1 et 2 pour savoir si l'insecte apparait à droite ou à gauche
    let choix = Math.floor(Math.random()* (2 - 1 + 1)) + 1;

    // on définit la hauteur à laquel il va apparaitre que ce soit à droite ou à gauche
    let hauteurY1 = Math.floor(Math.random() * (400 - 70 + 1)) + 70;
    let hauteurY2 = Math.floor(Math.random() * (400 - 70 + 1)) + 70;

    // on choisit au hasard le numéro de la futur cible compris 1 et nbdepot sur la scene
    let numeroC : number = Math.floor(Math.random() * (this.nbPot - 1 + 1)) + 1 ;

    // si il apparait à gauche
    if ( choix == 1 )
    {
      // on crée l'insecte avec la hauteur y1 et le numeroC qui correspondra au numéro du pot cible
      this.insecte = new Insecte(document.createElement("img"),20,hauteurY1,numeroC,5);
      this.insecte.setRotation(0);
      this.appendChild(this.insecte);
      this.insectes.push(this.insecte);
      // on cherche pour la cible numeroC, quel est le pot qui a le meme numeroP et donc on va définir la cible de l'insecte
      this.insecte.animer(this.trouverPotCible(numeroC));
    }

    if ( choix == 2 )
    {
      // on crée l'insecte avec la hauteur y1 et le numeroC qui correspondra au numéro du pot cible
      this.insecte = new Insecte(document.createElement("img"),580,hauteurY2,numeroC,5);

      this.insecte.setRotation(180);
      this.appendChild(this.insecte);
      this.insectes.push(this.insecte);

      // on cherche pour la cible numeroC, quel est le pot qui a le meme numeroP et donc on va définir la cible de l'insecte

      this.insecte.animer(this.trouverPotCible(numeroC));

    }

  }



  private trouverPotCible( cible : number)
  {
    // on parcours le tableau et si pot.getNump = cible en paramètre, on retourn le pot
    for (let i = 0; i<this.pots.length;i++)
    {
     for (let j = 0 ; j < this.pots[i].length ; j++)
     {
      if ( cible == this.pots[i][j].getNumeroPot() )
      {
        //console.log(cible + " " + this.pots[i][j].getNumeroPot() );
        //this.insecte.animer(this.pots[i][j]);
        return this.pots[i][j];
      }
     }
    }
  }


  private EcouteurClient()
  {
    window.addEventListener("keydown", this.changerSpray.bind(this));
    this.addEventListener("mousemove",this.suivreSouris.bind(this));
    this.addEventListener("click", this.utiliserSpray.bind(this));
  }


  private suivreSouris( event : MouseEvent)
  {
    if (this.currentSpray)
    {
      //coordonnée de la souris sur la scene (en x et y )
      let souriSX = event.clientX - this.getBoundingClientRect().left;
      let sourisY = event.clientY - this.getBoundingClientRect().top;

      // coordonées du spray = coordonnées de la souris

      let sprayX = souriSX - this.currentSpray.getWidth() / 2;
      let sprayY = sourisY - (this.currentSpray.getHeight() /3);

      this.currentSpray.setCoordX(sprayX);
      this.currentSpray.setCoordY(sprayY);
    }
  }

  public utiliserSpray(event: MouseEvent)
  {
    if (this.currentSpray instanceof SprayEau)
    {
      if (this.sprayEau !== null)
      {
        for (let i = 0; i < this.pots.length; i++)
        {
          for (let j = 0; j < this.pots[i].length; j++)
          {
            this.pot = this.pots[i][j];
            if ( this.pot !== null && this.sprayEau.getCenterX() >=  this.pot.getX() &&
              this.sprayEau.getCoordX() <= this.pot.getX() +  this.pot.getWidth() &&
              this.sprayEau.getCoordY() >=  this.pot.getY() &&
              this.sprayEau.getCoordY() <=  this.pot.getY() +  this.pot.getHeight())
            {
              let nouveauTimer =  this.pot.getTimer() + 5;

              this.pot.setTimer(nouveauTimer);
              return; // Sortir de la boucle si un pot est touché
            }
          }
        }
      }
    }
    else if (this.currentSpray instanceof SprayInsecte)
    {
      const clickedInsecte = this.clickInsecte(event);

      if (clickedInsecte)
      {
        clickedInsecte.setDommage(0);


        this.removeChild(clickedInsecte.getElement());
        const index = this.insectes.indexOf(clickedInsecte);
        if (index > -1)
        {
          this.insectes.splice(index, 1);
        }
        this.insecte.setEstMort(true);
      }
    }



  }


  private clickInsecte(event: MouseEvent)
  {
    const clickX = event.clientX - this.getBoundingClientRect().left;
    const clickY = event.clientY - this.getBoundingClientRect().top;

    for (let insecte of this.insectes) {
      if (
        clickX >= insecte.getX() &&
        clickX <= insecte.getX() + insecte.getWidth() &&
        clickY >= insecte.getY() &&
        clickY <= insecte.getY() + insecte.getHeight()
      ) {
        return insecte;
      }
    }

    return null;
  }



  private changerSpray(event: KeyboardEvent)
  {
    if (event.key === 's' || event.key === 'S' )
    {

      if (this.currentSpray)
      {
        this.removeChild(this.currentSpray.getElement());
      }
      this.ajouterSprayInsecte();
    }
    else if (event.key === 'd' || event.key === 'D')
    {
      if (this.currentSpray)
      {
        this.removeChild(this.currentSpray.getElement());
      }
      this.ajouterSprayEau();
    }
  }


}


// Fin //-------------------------------------------------------------------------------------------
