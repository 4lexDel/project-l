import p5 from "p5";
import { BaseInventory } from "./BaseInventory";
import { Puzzle } from "../../objects/Puzzle";
import { BaseContainer } from "./../BaseContainer";
import type { HorizontalAlign, VerticalAlign } from "./../BaseContainer";

export class PuzzleInventory extends BaseInventory {
    private puzzles: Puzzle[];

    constructor(p: p5, puzzles: Puzzle[], slotsPerRow: number, slotsPerCol: number, widthRatio: number, heightRatio: number, horizontalAlign: HorizontalAlign = "LEFT", verticalAlign: VerticalAlign = "TOP", parent?: BaseContainer) {
        super(p, widthRatio, heightRatio, horizontalAlign, verticalAlign, parent, Puzzle.puzzleDimRatio);
        this.puzzles = puzzles;

        this.slotsPerRow = slotsPerRow;
        this.slotsPerCol = slotsPerCol;

        this.resize();
    }

    public resize(): void {
        super.resize();
        this.initPuzzlesSetup();
    }

    public initPuzzlesSetup(): void {
        for (let row = 0; row < this.slotsPerCol; row++) {
            for (let col = 0; col < this.slotsPerRow; col++) {
                const { x: slotX, y: slotY } = this.getSlotPosition(row, col);
                const puzzleIndex = row * this.slotsPerRow + col;
                const puzzle = this.puzzles?.[puzzleIndex];

                if (puzzle) {
                    puzzle.x = slotX + this.slotPadding / 2;
                    puzzle.y = slotY + this.slotPadding / 2;
                }
            }
        }
    }

    public drawPuzzles(): void {
        this.puzzles.forEach(puzzle => {
            if(puzzle.x !== -1 && puzzle.y !== -1) 
                puzzle.draw({ maxX: this.slotWidth - this.slotPadding, maxY: this.slotHeight - this.slotPadding });
        });
    }

    public draw(): void {
        super.draw();
        this.drawPuzzles();
    }
}