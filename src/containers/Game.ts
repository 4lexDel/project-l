import p5 from "p5";
import { Player } from "./Player.ts";
import { Board } from "./Board.ts";
import { BaseContainer } from "./BaseContainer";
import { Opponent } from "./Opponent";
import { ActionHelper } from "./ActionHelper";
import { Puzzle } from "../objects/Puzzle.ts";
import { BaseInventory } from "./inventory/BaseInventory.ts";
import { Piece } from "../objects/Piece.ts";
import { PieceInventory } from "./inventory/PieceInventory.ts";
import { TextNotification } from "../tools/TextNotification.ts";
import { PieceFactory } from "../objects/PieceFactory.ts";

export class Game {
    private p: p5;

    private topContainer: BaseContainer;
    private middleContainer: BaseContainer;
    private bottomContainer: BaseContainer;
    private opponent: Opponent;
    private board: Board;
    private player: Player;

    private actionHelper: ActionHelper;
    private whoTurn: { current: "player" | "opponent" } = { current: "player" };

    private textNotification: TextNotification;

    constructor(p: p5) {
        this.p = p;

        this.textNotification = new TextNotification(p);

        // Top
        this.topContainer = new BaseContainer(p, 1, 0.75, "CENTER", "TOP");
        this.opponent = new Opponent(p, 1, 0.2, "CENTER", "TOP", this.topContainer);
        
        // Middle
        this.middleContainer = new BaseContainer(p, 1, 0.8, "CENTER", "BOTTOM", this.topContainer);
        this.actionHelper = new ActionHelper(p, 0.25, 1, "LEFT", "CENTER", this.middleContainer)
        this.board = new Board(p, 0.75, 1, "RIGHT", "BOTTOM", this.middleContainer);
        
        // Bottom
        this.bottomContainer = new BaseContainer(p, 1, 0.25, "CENTER", "BOTTOM");
        this.player = new Player(p, 1, 1, "CENTER", "BOTTOM", this.bottomContainer, this.whoTurn);

        this.resize();

        this.initCallbacks();

        this.textNotification.show("Welcome to Project L!").then(() => {
            this.textNotification.show("Player turn", p.color(255, 0, 50), 1000);
        });
    }

    private initCallbacks() {
        const pieceStacks = this.board.getPieceStacks();

        // Player & opponent turn management
        this.actionHelper.onPlayerSwitch = async(whoTurn: "player" | "opponent") => {
            this.whoTurn.current = whoTurn;
            if (whoTurn === "opponent") {
                await this.opponent.playMove(this.board);                
                this.actionHelper.switchToPlayerTurn();
            }
        };

        // ACTION: Get puzzle
        this.board.onPuzzleDropped = (origin: BaseInventory<Puzzle>, puzzle: Puzzle) => {
            if (this.whoTurn.current !== "player") return;            
            const success = this.player.puzzleInventory.pickUpItem(origin, puzzle);
            
            if (success) {
                // Update Locks (board and opponent)
                const columnUsed = origin.items.indexOf(undefined) % 3;
                if (columnUsed === -1) return;

                if (this.board.getLocks()[columnUsed].quantity > 0) {
                    this.board.getLocks()[columnUsed].quantity -= 1;
                    this.opponent.getPieceInventory().addItems(PieceFactory.create1block(this.p));
                }
                
                this.board.refreshPuzzleDistribution();

                // Consume action
                this.actionHelper.decreaseMoveAvailable();
                this.textNotification.show(`Puzzle taken!`, this.p.color(200, 80, 250), 1000);
            }

            // Reset piece stacks lock policy
            pieceStacks.setDefaultLockPolicy();
        }

        // ACTION: Get piece
        this.board.onPieceDropped = (origin: BaseInventory<Piece>, piece: Piece) => {
            if (this.whoTurn.current !== "player") return;
            const success = this.player.pieceInventory.pickUpItem(origin, piece);

            if (!success) return;
            // Consume action
            this.actionHelper.decreaseMoveAvailable();
            this.textNotification.show(`Piece taken!`, this.p.color(200, 80, 250), 1000);
        }

        // ACTION: Upgrade piece request: Nested callback to select the target piece
        this.player.onPieceUpgradeRequested = (_: PieceInventory, pieceToUpgrade: Piece) => {
            if (this.whoTurn.current !== "player") return;
            pieceStacks.setUpgradeLockPolicyFromPiece(pieceToUpgrade);
            // Select target piece
            this.board.onPieceSelected = (origin: BaseInventory<Piece>, pieceTarget: Piece) => {
                this.player.upgradePiece(pieceToUpgrade, pieceTarget, origin as PieceInventory);
                pieceStacks.setDefaultLockPolicy();
                pieceStacks.initItemSetup();

                // Important: remove callback to avoid multiple upgrade
                this.board.onPieceSelected = undefined;

                // Consume action
                this.actionHelper.decreaseMoveAvailable();
                this.textNotification.show("Piece upgraded!", this.p.color(200, 80, 250), 1000);
            }
        }

        // ACTION: piece used for a puzzle completion
        this.player.onPuzzleUpdated = () => {
            // Consume action
            this.actionHelper.decreaseMoveAvailable();

            this.textNotification.show(`Piece used!`, this.p.color(200, 80, 250), 1000);
        }

        // Use piece inventory => reset piece stacks lock policy (used to cancel upgrade mode)
        this.player.pieceInventory.onInventoryUsed = (_: BaseInventory<Piece>) => {
            pieceStacks.setDefaultLockPolicy();
            // Important: remove callback to avoid multiple upgrade
            this.board.onPieceSelected = undefined;
        }
    }

    public resize(): void {
        this.topContainer.resize();
        this.middleContainer.resize();
        this.bottomContainer.resize();
        this.opponent.resize();
        this.player.resize();
        this.board.resize();
        this.actionHelper.resize();
        this.textNotification.resize();
    }

    public draw(): void {
        this.topContainer.draw();
        this.middleContainer.draw();
        this.bottomContainer.draw();
        this.opponent.draw();
        this.player.draw();
        this.board.draw();
        this.actionHelper.draw();
        this.textNotification.draw();
    }
}