let formes : Array<Forme>;
let toile : HTMLCanvasElement;

function demarrer()
{
  let nom : string = "World";
  console.log("Hello " + nom + " !");

  toile= <HTMLCanvasElement>document.getElementById("toile");
  let boite : DOMRect = toile.getBoundingClientRect();

  toile.width = boite.width;
  toile.height = boite.height;

  let r1 : Rectangle= new Rectangle(50,75,100,150);
  let r2 : Rectangle= new Rectangle(300,450,200,120);
  let p1 : Polygone = new Polygone(180,280,20,10,15);
  let p2 : Polygone = new Polygone(380,280,20,10,15);




  formes= [r1,r2,p1,p2];
  for (let forme of formes) forme.tracer(toile);


}


function translater(x : number ,y : number)
{
  let contexte : CanvasRenderingContext2D = toile.getContext("2d");
  contexte.clearRect(0,0,toile.width,toile.height);

  for (let forme of formes) forme.translater(x,y);
  for (let forme of formes) forme.tracer(toile);
}

/*function tracerRectangle(x : number, y : number, l : number, h : number, canvas : HTMLCanvasElement)
{
  let context : CanvasRenderingContext2D = canvas.getContext("2d");


  context.lineWidth = 8 ;
  context.strokeStyle = "#A234F5";
  context.fillStyle = "#ff8000";

  context.beginPath();

  context.moveTo(x,y);
  context.lineTo(x+l,y);
  context.lineTo(x+l,y+h);
  context.lineTo(x,y+h);
  context.lineTo(x,y);
  context.lineTo(x+l,y); // refaire un tour pour cacher le pixel du début


  context.stroke();
  context.fill();
}
*/

