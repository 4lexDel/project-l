import p5 from "p5";
import { Piece } from "./objects/Piece";
import { Puzzle } from "./objects/Puzzle";
import { Game } from "./containers/Game";
import { Score } from "./tools/Score";

let pieces: Piece[] = [];
let puzzles: Puzzle[] = [];

let game: Game;
let score: Score;

const sketch = (p: p5) => {
  p.setup = () => {
    p.frameRate(60);

    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(220);

    game = new Game(p);
    score = new Score(p, 10, 30);

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
    /** ------------------------------------------------------------------------------------- */
  };

  p.draw = () => {
    p.clear();
    p.background(220);

    game.draw();
    score.draw();

    /** ------------------------------------------------------------------------------------- */
    puzzles.forEach(puzzle => puzzle.draw());
    /** ------------------------------------------------------------------------------------- */
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    p.background(220);

    game.resize();
  };
};

new p5(sketch);