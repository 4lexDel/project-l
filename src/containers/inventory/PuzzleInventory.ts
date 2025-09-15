import p5 from "p5";
import { BaseInventory, type CounterMode } from "./BaseInventory";
import { Puzzle } from "../../objects/Puzzle";
import { BaseContainer } from "./../BaseContainer";
import type { HorizontalAlign, VerticalAlign } from "./../BaseContainer";
import type { Piece } from "../../objects/Piece";

export class PuzzleInventory extends BaseInventory<Puzzle> {
    constructor(p: p5, puzzles: Puzzle[], slotsPerRow: number, slotsPerCol: number, widthRatio: number, heightRatio: number, horizontalAlign: HorizontalAlign = "LEFT", verticalAlign: VerticalAlign = "TOP", parent?: BaseContainer, readonly: boolean = true, showBorder: boolean = true, allowInternalMovement: boolean = true, counterMode: CounterMode = "HIDDEN") {
        super(p, puzzles, slotsPerRow, slotsPerCol, widthRatio, heightRatio, horizontalAlign, verticalAlign, parent, readonly, Puzzle.puzzleDimRatio, showBorder, allowInternalMovement, counterMode);

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
                // Place placed!
                console.log("Piece placed!");

                // Clear it from the inventory
                const currentIndex = origin.items.indexOf(piece);
                origin.items[currentIndex] = undefined;
                
                // Hide the piece and store it in the puzzle instance
                puzzle.piecesUsed.push(piece);
                piece.clearEvents();

                return;
            }
        });
    }

    public draw(): void {
        super.draw();
    }
}