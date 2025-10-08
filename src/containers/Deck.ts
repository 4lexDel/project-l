import p5 from "p5";
import { BaseContainer } from "./BaseContainer";
import { PieceFactory } from "../objects/PieceFactory";
import { Piece } from "../objects/Piece";
import type { HorizontalAlign, VerticalAlign } from "./BaseContainer";
import { PieceInventory } from "./inventory/PieceInventory";
import { PuzzleInventory } from "./inventory/PuzzleInventory";
import { InventoryOption, type BaseInventory } from "./inventory/BaseInventory";
import { Puzzle } from "../objects/Puzzle";
import { BaseObject } from "../objects/BaseObject";

export class Deck extends BaseContainer {
    private puzzleInventoryAchieved: PuzzleInventory;

    private rightContainer: BaseContainer;
    public pieceInventory: PieceInventory;
    public puzzleInventory: PuzzleInventory;

    public pieces: Piece[];

    public onPieceDropped?: (origin: BaseInventory<Piece>, piece: Piece) => void;
    public onPieceUpgradeRequested?: (origin: PieceInventory, piece: Piece) => void;

    private deckAlign: "VERTICAL" | "HORIZONTAL" = "HORIZONTAL";
    private widthLimit: number = 800;

    constructor(p: p5, widthRatio: number, heightRatio: number, horizontalAlign: HorizontalAlign = "LEFT", verticalAlign: VerticalAlign = "TOP", parentContainer?: BaseContainer) {
        super(p, widthRatio, heightRatio, horizontalAlign, verticalAlign, parentContainer);

        // Left
        this.puzzleInventoryAchieved  = new PuzzleInventory(p, [], 1, 1, 0.1, 1, "LEFT", "CENTER", this);
        // Right
        this.rightContainer = new BaseContainer(p, 0.9, 1, "RIGHT", "CENTER", this);

        this.pieces = PieceFactory.createAllPieces(p);

        const pieceInventoryOptions = new InventoryOption();
        pieceInventoryOptions.readonly = false;

        const puzzleInventoryOptions = new InventoryOption();
        puzzleInventoryOptions.readonly = false;
        
        this.pieceInventory = new PieceInventory(p, this.pieces, 10, 3, 0.5, 1, "LEFT", "CENTER", this.rightContainer, pieceInventoryOptions);
        this.puzzleInventory = new PuzzleInventory(p, [], 4, 1, 0.5, 1, "RIGHT", "CENTER", this.rightContainer, puzzleInventoryOptions);

        this.resize();
        this.initCallbacks();
    }

    public initCallbacks() {
        this.pieceInventory.onItemDropped = (origin: BaseInventory<Piece>, piece: Piece) => {
            this.onPieceDropped?.(origin, piece);
        }

        this.puzzleInventory.onPuzzleCompleted = (origin: BaseInventory<Puzzle>, puzzle: Puzzle) => {
            origin.removeItem(puzzle);
            this.puzzleInventoryAchieved.addItems(puzzle);
            puzzle.clean();
        }

        // To make the pieces fit the slot when resizing
        this.puzzleInventory.onContainerResized = () => {            
            const { slotWidth } = this.puzzleInventory.getSlotSize();
            const width = slotWidth - this.puzzleInventory.getSlotPadding();
            const ratio = width / (Puzzle.nbCol * Puzzle.blockSize + Puzzle.padding);
        
            BaseObject.blockSize = Puzzle.blockSize * ratio;
        };

        this.pieceInventory.onPieceUpgradeRequested = (origin: PieceInventory, piece: Piece) => {
            this.onPieceUpgradeRequested?.(origin, piece);
        };
    }

    public upgradePiece(pieceToUpgrade: Piece, pieceTarget: Piece, pieceStacks: PieceInventory) {
        pieceTarget.quantity -= 1;
        // Remove it from the first inventory
        if (pieceTarget.quantity <= 0) {
            pieceStacks.removeItem(pieceTarget);
        }

        pieceToUpgrade.tier = pieceTarget.tier;
        pieceToUpgrade.setShape(pieceTarget.getShape());
        pieceToUpgrade.colorOption = pieceTarget.colorOption;
        pieceToUpgrade.quantity = 1;
    }

    public resize() {
        super.resize();

        if (this.p.windowWidth < this.widthLimit && this.deckAlign !== "VERTICAL") {
            
            this.deckAlign = "VERTICAL";
            this.puzzleInventory.setWidthRatio(1);
            this.puzzleInventory.setHeightRatio(0.5);
            this.puzzleInventory.setHorizontalAlign("CENTER");
            this.puzzleInventory.setVerticalAlign("TOP");

            this.pieceInventory.setWidthRatio(1);
            this.pieceInventory.setHeightRatio(0.5);
            this.pieceInventory.setHorizontalAlign("CENTER");
            this.pieceInventory.setVerticalAlign("BOTTOM");
            this.pieceInventory.setSlotsDim(15, 2);
        }
        else if (this.p.windowWidth >= this.widthLimit && this.deckAlign !== "HORIZONTAL") {
            this.deckAlign = "HORIZONTAL";
            
            this.puzzleInventory.setWidthRatio(0.5);
            this.puzzleInventory.setHeightRatio(1);
            this.puzzleInventory.setHorizontalAlign("RIGHT");
            this.puzzleInventory.setVerticalAlign("CENTER");

            this.pieceInventory.setWidthRatio(0.5);
            this.pieceInventory.setHeightRatio(1);
            this.pieceInventory.setHorizontalAlign("LEFT");
            this.pieceInventory.setVerticalAlign("CENTER");
            this.pieceInventory.setSlotsDim(10, 3);
        }

        this.rightContainer.resize();
        this.puzzleInventoryAchieved.resize();
        this.pieceInventory.resize();
        this.puzzleInventory.resize();
    }

    public draw(): void {
        super.draw();

        // Puzzle achieved
        this.puzzleInventoryAchieved.draw();
        // Puzzles
        this.puzzleInventory.draw();
        // Pieces
        this.pieceInventory.draw();
    }
}