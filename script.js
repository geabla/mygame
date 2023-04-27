// Definizione variabili globali
var canvas;
var ctx;
var gridWidth = 20;
var gridHeight = 20;
var gridSize = 20;
var dog;
var bone;
var score;
var isPlaying = false;
var gameLoop;

// Definizione classe Dog
class Dog {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = gridSize;
    this.height = gridSize;
    this.tail = [];
  }

  // Disegna il cane sul canvas
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Disegna la coda del cane
    ctx.fillStyle = "black";
    for (var i = 0; i < this.tail.length; i++) {
      var tailBlock = this.tail[i];
      ctx.fillRect(tailBlock.x, tailBlock.y, this.width, this.height);
    }
  }

  // Aggiorna la posizione del cane
  update() {
    // Aggiungi la posizione attuale del cane alla coda
    this.tail.push({ x: this.x, y: this.y });

    // Riduci la lunghezza della coda allungata dell'ultimo blocco
    if (this.tail.length > score) {
      this.tail.shift();
    }

    // Aggiorna la posizione del cane in base alla direzione
    switch (direction) {
      case "up":
        this.y -= gridSize;
        break;
      case "down":
        this.y += gridSize;
        break;
      case "left":
        this.x -= gridSize;
        break;
      case "right":
        this.x += gridSize;
        break;
    }

    // Controlla se il cane ha mangiato l'osso
    if (this.x == bone.x && this.y == bone.y) {
      score++;
      generateBone();
    }

    // Controlla se il cane ha colpito il bordo o se stesso
    if (
      this.x < 0 ||
      this.x >= canvas.width ||
      this.y < 0 ||
      this.y >= canvas.height ||
      checkCollision(this.x, this.y, this.tail)
    ) {
      endGame();
    }
  }
}

// Definizione classe Bone
class Bone {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = gridSize;
    this.height = gridSize;
  }

  // Disegna l'osso sul canvas
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

// Genera un nuovo osso in una posizione casuale sulla griglia
function generateBone() {
  var x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
  var y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
  bone = new Bone(x, y, "brown");
}

// Controlla se il cane ha colpito la sua coda
function checkCollision(x, y, tail) {
  for (var i = 0; i < tail.length; i++) {
    if (x == tail[i].x && y == tail[i].y) {
      return true;
    }
  }
  return false;
}

// Funzione per iniziare una nuova partita
function new
