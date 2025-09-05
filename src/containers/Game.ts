import p5 from "p5";
import { Deck } from "./Deck";
import { Board } from "./Board";
import { BaseContainer } from "./BaseContainer";

export class Game {
    private p: p5;

    public deck: Deck;
    public board: Board;

    private layoutContainer!: BaseContainer;

    constructor(p: p5) {
        this.p = p;

        this.layoutContainer = new BaseContainer(p, 1, 0.75, "CENTER", "TOP");
        this.board = new Board(p, 1, 0.75, "CENTER", "BOTTOM", this.layoutContainer);
        
        this.deck = new Deck(p, 1, 0.25, "CENTER", "BOTTOM");

        this.resize();
    }

    public resize(): void {
        this.deck.resize();
        this.layoutContainer.resize();
        this.board.resize();
    }

    public draw(): void {
        this.layoutContainer.draw();
        this.board.draw();
        this.deck.draw();
    }
}