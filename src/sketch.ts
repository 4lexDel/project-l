import p5 from "p5";
import { Game } from "./containers/Game";
import { Score } from "./tools/Score";

let game: Game;
let score: Score;

const sketch = (p: p5) => {
  p.setup = () => {
    p.frameRate(60);

    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(220);

    game = new Game(p);
    score = new Score(p, 10, 30);
  };

  p.draw = () => {
    p.clear();
    p.background(0);

    game.draw();
    score.draw();
  };

  p.windowResized = () => {    
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    p.background(220);

    game.resize();
  };
};

new p5(sketch);