import p5 from "p5";
import { Game } from "./containers/Game";
// import { Score } from "./tools/Score";
import { initColors } from "./colors";
import { RendererSystem } from "./tools/RendererSystem";

let game: Game;
let rendererSystem: RendererSystem;

// let score: Score;

const sketch = (p: p5) => {
  p.setup = () => {
    rendererSystem = RendererSystem.getInstance();

    p.frameRate(60);

    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(220);
    
    // Set color variables
    initColors(p);

    game = new Game(p);
    // score = new Score(p, 10, 30);
  };

  p.draw = () => {
    p.clear();
    p.background(0);

    game.draw();
    rendererSystem.render();
    // score.draw();
  };

  p.windowResized = () => {    
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    p.background(220);

    game.resize();
  };
};

new p5(sketch);