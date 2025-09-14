import p5 from "p5";
import { BaseContainer } from "./BaseContainer";
import { PuzzleFactory } from "../objects/PuzzleFactory";
import { Puzzle } from "../objects/Puzzle";
import type { HorizontalAlign, VerticalAlign } from "./BaseContainer";
import { PuzzleInventory } from "./inventory/PuzzleInventory";
import { Piece } from "../objects/Piece";
import { PieceInventory } from "./inventory/PieceInventory";
import { PieceFactory } from "../objects/PieceFactory";
import { Lock } from "../objects/Lock";
import { BaseInventory } from "./inventory/BaseInventory";

export class Board extends BaseContainer {
    private stackPuzzles: Puzzle[];
    private locks: Lock[];
    private stackPieces: Piece[];

    private leftContainer: BaseContainer;
    private rightContainer: BaseContainer;

    private locksGrid: PieceInventory;
    private puzzleGrid: PuzzleInventory;
    private pieceStacks: PieceInventory;
    private puzzleStack: PuzzleInventory;

    public onPuzzleDropped?: (origin: BaseInventory<Puzzle>, puzzle: Puzzle, mouseX: number, mouseY: number) => void;
    public onPieceDropped?: (origin: BaseInventory<Piece>, piece: Piece, mouseX: number, mouseY: number) => void;

    constructor(p: p5, widthRatio: number, heightRatio: number, horizontalAlign: HorizontalAlign = "LEFT", verticalAlign: VerticalAlign = "TOP", parentContainer?: BaseContainer) {
        super(p, widthRatio, heightRatio, horizontalAlign, verticalAlign, parentContainer);
        this.heightRatio = heightRatio;

        this.locks = [
            new Lock(p, 1),
            new Lock(p, 2),
            new Lock(p, 1)
        ];
        this.stackPuzzles = [
            ...PuzzleFactory.createBasicWhitePuzzleStack(p, 15),
            ...PuzzleFactory.createBasicBlackPuzzleStack(p, 10)
        ];

        this.stackPieces = PieceFactory.createAllPieces(p);
        [10, 10, 10, 10, 10, 10, 10, 10, 10].forEach((quantity: number, i) => this.stackPieces[i%this.stackPieces.length].quantity = quantity);

        this.leftContainer = new BaseContainer(p, 0.75, 0.95, "LEFT", "TOP", this);
        this.rightContainer = new BaseContainer(p, 0.25, 0.95, "RIGHT", "CENTER", this);

        this.locksGrid = new PieceInventory(p, this.locks, 3, 1, 1, 0.2, "CENTER", "TOP", this.leftContainer, true, false);
        this.puzzleGrid = new PuzzleInventory(p, [], 3, 3, 1, 0.8, "CENTER", "BOTTOM", this.leftContainer, false, false, false);

        this.puzzleStack = new PuzzleInventory(p, this.stackPuzzles, 1, 1, 1, 0.3, "CENTER", "TOP", this.rightContainer, true, false, false, "ITEMS_LENGTH");
        this.pieceStacks = new PieceInventory(p, this.stackPieces, 3, 3, 1, 0.65, "CENTER", "BOTTOM", this.rightContainer, false, false, false, "ITEMS_QUANTITY");

        this.resize();
        this.initCallbacks();
        this.refreshPuzzleDistribution();
    }

    private initCallbacks() {
        // Inspire from the component programming style
        this.puzzleGrid.onItemDropped = (origin: BaseInventory<Puzzle>, puzzle: Puzzle, mouseX: number, mouseY: number) => {
            this.onPuzzleDropped && this.onPuzzleDropped(origin, puzzle, mouseX, mouseY);
        }

        this.pieceStacks.onItemDropped = (origin: BaseInventory<Piece>, piece: Piece, mouseX: number, mouseY: number) => {
            this.onPieceDropped && this.onPieceDropped(origin, piece, mouseX, mouseY);
        }
    }

    public refreshPuzzleDistribution() {
        // Purpose keep 9 puzzles on puzzleGrid, take them from the puzzleStack
        
        const nbPuzzleToTake = 9 - this.puzzleGrid.items.filter((i) => i).length;
        
        const newPuzzleForTheGrid = this.puzzleStack.items.splice(0, nbPuzzleToTake);
        this.puzzleGrid.items.unshift(...newPuzzleForTheGrid);
        this.puzzleGrid.items = this.puzzleGrid.items.filter((i) => i);

        // Refresh piece positions
        this.puzzleGrid.initItemSetup();
        this.puzzleStack.initItemSetup();        
    }

    public resize(): void {
        super.resize();
        this.leftContainer.resize();
        this.rightContainer.resize();
        this.locksGrid.resize();
        this.puzzleStack.resize();
        this.puzzleGrid.resize();
        this.pieceStacks.resize();
    }

    public draw(): void {
        this.locksGrid.draw();
        this.puzzleGrid.draw();
        this.pieceStacks.draw();
        this.puzzleStack.draw();
    }
}