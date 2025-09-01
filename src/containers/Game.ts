import p5 from "p5";
import { Deck } from "./Deck";
import { Board } from "./Board";

export class Game {
    public p: p5;

    public deck: Deck;
    public board: Board;

    constructor(p: p5) {
        this.p = p;

        const deckHeight = p.height / 3;
        const boardHeight = p.height - deckHeight;

        this.deck = new Deck(p, 0, boardHeight, p.width, deckHeight);
        this.board = new Board(p, 0, 0, p.width, boardHeight);
    }

    public resize(): void {
        this.deck.dx = this.p.width;
        this.deck.dy = this.p.height / 3;
        this.board.dx = this.p.width;
        this.board.dy = this.p.height - this.deck.dy;

        this.deck.resize();
    }

    public draw(): void {
        this.deck.draw();
        this.board.draw();
    }
}