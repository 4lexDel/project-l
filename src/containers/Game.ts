import p5 from "p5";
import { Deck } from "./Deck";
import { Board } from "./Board";
import { BaseContainer } from "./BaseContainer";
import { Opponent } from "./Opponent";
import { ActionHelper } from "./ActionHelper";

export class Game {
    private topContainer: BaseContainer;
    private middleContainer: BaseContainer;
    private bottomContainer: BaseContainer;
    private opponent: Opponent;
    private board: Board;
    private actionHelper: ActionHelper;
    private deck: Deck;


    constructor(p: p5) {        
        // Top
        this.topContainer = new BaseContainer(p, 1, 0.75, "CENTER", "TOP");
        this.opponent = new Opponent(p, 1, 0.2, "CENTER", "TOP", this.topContainer);
        
        // Middle
        this.middleContainer = new BaseContainer(p, 1, 0.8, "CENTER", "BOTTOM", this.topContainer);
        this.actionHelper = new ActionHelper(p, 0.25, 1, "LEFT", "CENTER", this.middleContainer)
        this.board = new Board(p, 0.75, 1, "RIGHT", "BOTTOM", this.middleContainer);
        
        // Bottom
        this.bottomContainer = new BaseContainer(p, 1, 0.25, "CENTER", "BOTTOM");
        this.deck = new Deck(p, 1, 1, "CENTER", "BOTTOM", this.bottomContainer);

        this.resize();
    }

    public resize(): void {
        this.topContainer.resize();
        this.middleContainer.resize();
        this.bottomContainer.resize();
        this.opponent.resize();
        this.board.resize();
        this.actionHelper.resize();
        this.deck.resize();
    }

    public draw(): void {
        this.topContainer.draw();
        this.middleContainer.draw();
        this.bottomContainer.draw();
        this.board.draw();
        this.actionHelper.draw();
        this.opponent.draw();
        this.deck.draw();
    }
}