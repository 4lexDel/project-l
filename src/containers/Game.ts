import p5 from "p5";
import { Deck } from "./Deck";
import { Board } from "./Board.ts";
import { BaseContainer } from "./BaseContainer";
import { Opponent } from "./Opponent";
import { ActionHelper } from "./ActionHelper";
import { Puzzle } from "../objects/Puzzle.ts";
import { BaseInventory } from "./inventory/BaseInventory.ts";
import { Piece } from "../objects/Piece.ts";
import type { PieceInventory } from "./inventory/PieceInventory.ts";

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

        this.initCallbacks();
    }

    private initCallbacks() {
        // Get puzzle
        this.board.onPuzzleDropped = (origin: BaseInventory<Puzzle>, puzzle: Puzzle) => {            
            this.deck.puzzleInventory.pickUpItem(origin, puzzle);
            this.board.refreshPuzzleDistribution();
        }

        // Get piece
        this.board.onPieceDropped = (origin: BaseInventory<Piece>, piece: Piece) => {
            this.deck.pieceInventory.pickUpItem(origin, piece);
        }

        // Upgrade piece request
        this.deck.onPieceUpgradeRequested = (_: PieceInventory, pieceToUpgrade: Piece) => {
            const pieceStacks = this.board.getPieceStacks();
            pieceStacks.setUpgradeLockPolicyByTier(pieceToUpgrade.tier);
            // Select target piece
            this.board.onPieceSelected = (origin: BaseInventory<Piece>, pieceTarget: Piece) => {
                this.deck.upgradePiece(pieceToUpgrade, pieceTarget, origin as PieceInventory);
                pieceStacks.setDefaultLockPolicy();

                // Important: remove callback to avoid multiple upgrade
                this.board.onPieceSelected = undefined;
            }
        }

        // Use piece
        this.deck.onPieceDropped = (origin: BaseInventory<Piece>, piece: Piece) => {
            this.deck.puzzleInventory.usePiece(origin, piece);
        }
    }

    public resize(): void {
        this.topContainer.resize();
        this.middleContainer.resize();
        this.bottomContainer.resize();
        this.opponent.resize();
        this.deck.resize();
        this.board.resize();
        this.actionHelper.resize();
    }

    public draw(): void {
        this.topContainer.draw();
        this.middleContainer.draw();
        this.bottomContainer.draw();
        this.opponent.draw();
        this.deck.draw();
        this.board.draw();
        this.actionHelper.draw();
    }
}