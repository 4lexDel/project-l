import p5 from "p5";
import { Piece } from "./Piece";
import { Puzzle } from "./Puzzle";

let pieces: Piece[] = [];
let puzzles: Puzzle[] = [];

let selectedPiece: Piece | null = null;
let offsetX = 0;
let offsetY = 0;
// let score = 0;

const sketch = (p: p5) => {
  p.setup = () => {
    p.frameRate(60);

    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(220);

    pieces.push(new Piece(p, [[0, 0], [1, 0]], p.color(255, 204, 0)));       // 2-block
    pieces.push(new Piece(p, [[0, 0], [1, 0], [1, 1]], p.color(100, 200, 255))); // L-shape
    pieces.push(new Piece(p, [[0, 0], [1, 0], [2, 0]], p.color(255, 150, 100))); // 3-block

    puzzles.push(new Puzzle(p, 600, 100, [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ], 3));
    
    puzzles.push(new Puzzle(p, 600, 300, [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0]
    ], 4));
  };

  p.draw = () => {
    p.clear();
    p.background(220);

    puzzles.forEach(puzzle => puzzle.display());
    pieces.forEach(piece => piece.display()); 
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    p.background(220);
  };

  p.mousePressed = () => {
    for (let i = pieces.length - 1; i >= 0; i--) {
      if (pieces[i].isMouseInside(p.mouseX, p.mouseY)) {
        selectedPiece = pieces[i];
        offsetX = p.mouseX - selectedPiece.x;
        offsetY = p.mouseY - selectedPiece.y;
        break;
      }
    }
  };

  p.mouseDragged = () => {
    if (selectedPiece) {
      selectedPiece.x = p.mouseX - offsetX;
      selectedPiece.y = p.mouseY - offsetY;
    }
  };

  p.mouseReleased = () => {
    if (selectedPiece) {
      for (const puzzle of puzzles) {
        if (puzzle.tryPlacePiece(selectedPiece)) {
          pieces = pieces.filter(p => p !== selectedPiece);
          // score += puzzle.score;
          break;
        }
      }
      selectedPiece = null;
    }
  };
};

new p5(sketch);