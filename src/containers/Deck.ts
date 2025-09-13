import p5 from "p5";
import { BaseContainer } from "./BaseContainer";
import { PieceFactory } from "../objects/PieceFactory";
import { Piece } from "../objects/Piece";
import { PuzzleFactory } from "../objects/PuzzleFactory";
import type { HorizontalAlign, VerticalAlign } from "./BaseContainer";
import { PieceInventory } from "./inventory/PieceInventory";
import { PuzzleInventory } from "./inventory/PuzzleInventory";

export class Deck extends BaseContainer {
    private puzzleInventoryAchieved: PuzzleInventory;

    private rightContainer: BaseContainer;
    private pieceInventory: PieceInventory;
    private puzzleInventory: PuzzleInventory;

    public pieces: Piece[];

    constructor(p: p5, widthRatio: number, heightRatio: number, horizontalAlign: HorizontalAlign = "LEFT", verticalAlign: VerticalAlign = "TOP", parentContainer?: BaseContainer) {
        super(p, widthRatio, heightRatio, horizontalAlign, verticalAlign, parentContainer);

        let puzzles = PuzzleFactory.createBasicWhitePuzzleStack(p, 1);
        this.puzzleInventoryAchieved  = new PuzzleInventory(p, puzzles, 1, 1, 0.1, 1, "LEFT", "CENTER", this);
        this.rightContainer = new BaseContainer(p, 0.9, 1, "RIGHT", "CENTER", this);

        this.pieces = PieceFactory.createAllPieces(p);
        this.pieceInventory = new PieceInventory(p, this.pieces, 0.5, 1, "LEFT", "CENTER", this.rightContainer, false);

        puzzles = PuzzleFactory.createBasicWhitePuzzleStack(p, 2);
        this.puzzleInventory = new PuzzleInventory(p, puzzles, 4, 1, 0.5, 1, "RIGHT", "CENTER", this.rightContainer);

        this.resize();
    }

    public resize() {
        super.resize();

        this.rightContainer.resize();
        this.puzzleInventoryAchieved.resize();
        this.pieceInventory.resize();
        this.puzzleInventory.resize();
    }

    public draw(): void {
        super.draw();

        // Container
        this.rightContainer.draw();

        // Puzzle achieved
        this.puzzleInventoryAchieved.draw();

        // Puzzles
        this.puzzleInventory.draw();

        // Pieces
        this.pieceInventory.draw();
    }
}