import p5 from "p5";
import { BaseInventory } from "./BaseInventory";
import { Puzzle } from "../../objects/Puzzle";
import { BaseContainer } from "./../BaseContainer";
import type { HorizontalAlign, VerticalAlign } from "./../BaseContainer";

export class PuzzleInventory extends BaseInventory {
    constructor(p: p5, puzzles: Puzzle[], slotsPerRow: number, slotsPerCol: number, widthRatio: number, heightRatio: number, horizontalAlign: HorizontalAlign = "LEFT", verticalAlign: VerticalAlign = "TOP", parent?: BaseContainer, readonly: boolean = true) {
        super(p, puzzles, widthRatio, heightRatio, horizontalAlign, verticalAlign, parent, readonly, Puzzle.puzzleDimRatio);

        this.slotsPerRow = slotsPerRow;
        this.slotsPerCol = slotsPerCol;

        this.resize();
    }

    public resize(): void {
        super.resize();
    }

    public draw(): void {
        super.draw();
    }
}