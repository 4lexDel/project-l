import p5 from "p5";
import { Deck } from "./Deck";
import { Board } from "./Board";
import { BaseContainer } from "./BaseContainer";
import { OpponentArea } from "./OpponentArea";

export class Game {
    private layoutContainer: BaseContainer;
    private opponentArea: OpponentArea;
    private board: Board;
    private deck: Deck;


    constructor(p: p5) {
        this.layoutContainer = new BaseContainer(p, 1, 0.75, "CENTER", "TOP");
        this.opponentArea = new OpponentArea(p, 1, 0.25, "CENTER", "TOP", this.layoutContainer);
        this.board = new Board(p, 1, 0.75, "CENTER", "BOTTOM", this.layoutContainer);
        
        this.deck = new Deck(p, 1, 0.25, "CENTER", "BOTTOM");

        this.resize();
    }

    public resize(): void {
        this.layoutContainer.resize();
        this.opponentArea.resize();
        this.board.resize();
        this.deck.resize();
    }

    public draw(): void {
        this.board.draw();
        this.layoutContainer.draw();
        this.opponentArea.draw();
        this.deck.draw();
    }
}