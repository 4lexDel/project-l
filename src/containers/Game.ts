import p5 from "p5";
import { Deck } from "./Deck";
import { Board } from "./Board";

export class Game {
    public p: p5;

    public deck: Deck;
    public board: Board;

    constructor(p: p5) {
        this.p = p;

        this.board = new Board(p, 1, 0.75, "CENTER", "TOP");
        this.deck = new Deck(p, 1, 0.25, "CENTER", "BOTTOM");
    }

    public resize(): void {
        this.deck.resize();
        this.board.resize();
    }

    public draw(): void {
        this.board.draw();
        this.deck.draw();
    }
}