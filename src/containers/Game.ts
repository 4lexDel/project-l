import p5 from "p5";
import { Deck } from "./Deck";
import { Board } from "./Board";
import { BaseContainer } from "./BaseContainer";
import { Opponent } from "./Opponent";

export class Game {
    private topContainer: BaseContainer;
    private middleContainer: BaseContainer;
    private opponent: Opponent;
    private board: Board;
    private deck: Deck;


    constructor(p: p5) {
        this.topContainer = new BaseContainer(p, 1, 0.75, "CENTER", "TOP");
        this.opponent = new Opponent(p, 1, 0.25, "CENTER", "TOP", this.topContainer);
        this.middleContainer = new BaseContainer(p, 1, 0.75, "CENTER", "BOTTOM", this.topContainer);
        this.board = new Board(p, 1, 1, "RIGHT", "BOTTOM", this.middleContainer);
        
        this.deck = new Deck(p, 1, 0.25, "CENTER", "BOTTOM");

        this.resize();
    }

    public resize(): void {
        this.topContainer.resize();
        this.middleContainer.resize();
        this.opponent.resize();
        this.board.resize();
        this.deck.resize();
    }

    public draw(): void {
        this.board.draw();
        this.topContainer.draw();
        this.middleContainer.draw();
        this.opponent.draw();
        this.deck.draw();
    }
}