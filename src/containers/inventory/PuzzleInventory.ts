import p5 from "p5";
import { BaseInventory, InventoryOption } from "./BaseInventory";
import { Puzzle } from "../../objects/Puzzle";
import { BaseContainer } from "./../BaseContainer";
import type { HorizontalAlign, VerticalAlign } from "./../BaseContainer";
import type { Piece } from "../../objects/Piece";

export class PuzzleInventory extends BaseInventory<Puzzle> {
    public onPuzzleCompleted?: (origin: BaseInventory<Puzzle>, puzzle: Puzzle) => void;

    constructor(p: p5, puzzles: Puzzle[], slotsPerRow: number, slotsPerCol: number, widthRatio: number, heightRatio: number, horizontalAlign: HorizontalAlign = "LEFT", verticalAlign: VerticalAlign = "TOP", parent?: BaseContainer, inventoryOptions?: InventoryOption) {
        super(p, puzzles, slotsPerRow, slotsPerCol, widthRatio, heightRatio, horizontalAlign, verticalAlign, parent, inventoryOptions);
        this.inventoryOptions.slotRatio = Puzzle.puzzleDimRatio;

        this.resize();
    }

    public resize(): void {
        super.resize();
    }

    public usePiece(origin: BaseInventory<Piece>, piece: Piece) {
        this.items.forEach((puzzle: Puzzle | null | undefined) => {
            if (puzzle && puzzle.tryPlacePiece(
                piece, 
                { 
                    maxX: (this.slotWidth - this.slotPadding),
                    maxY: (this.slotHeight - this.slotPadding)
                }
            )) {
                // Clear it from the origin inventory
                origin.removeItem(piece);
                
                // Hide the piece and store it in the puzzle instance
                puzzle.piecesUsed.push(piece);

                //Check puzzle completion
                if (puzzle.isCompleted()) {                    
                    origin.addItems(...puzzle.piecesUsed, puzzle.pieceReward.clone());

                    this.onPuzzleCompleted?.(this, puzzle);
                }

                return;
            }
        });
    }

    public draw(): void {
        super.draw();
    }
}