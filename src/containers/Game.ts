import p5 from "p5";
import { Deck } from "./Deck";
import { Board } from "./Board";

export class Game {
    public p: p5;

    public deck: Deck;
    public board: Board;

    constructor(p: p5) {
        this.p = p;

        this.board = new Board(p, 0.75);
        this.deck = new Deck(p, 0.25);
    }

    public resize(): void {
        this.deck.dx = this.p.width;
        this.deck.dy = this.p.height / 3;
        this.board.dx = this.p.width;
        this.board.dy = this.p.height - this.deck.dy;

        this.deck.resize();
        this.board.resize();
    }

    public draw(): void {
        this.board.draw();
        this.deck.draw();
    }
}