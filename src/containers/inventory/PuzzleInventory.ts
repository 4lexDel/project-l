import p5 from "p5";
import { BaseInventory, type CounterMode } from "./BaseInventory";
import { Puzzle } from "../../objects/Puzzle";
import { BaseContainer } from "./../BaseContainer";
import type { HorizontalAlign, VerticalAlign } from "./../BaseContainer";

export class PuzzleInventory extends BaseInventory {
    constructor(p: p5, puzzles: Puzzle[], slotsPerRow: number, slotsPerCol: number, widthRatio: number, heightRatio: number, horizontalAlign: HorizontalAlign = "LEFT", verticalAlign: VerticalAlign = "TOP", parent?: BaseContainer, readonly: boolean = true, showBorder: boolean = true, allowInternalMovement: boolean = true, counterMode: CounterMode = "HIDDEN") {
        super(p, puzzles, slotsPerRow, slotsPerCol, widthRatio, heightRatio, horizontalAlign, verticalAlign, parent, readonly, Puzzle.puzzleDimRatio, showBorder, allowInternalMovement, counterMode);

        this.resize();
    }

    public resize(): void {
        super.resize();
    }

    public draw(): void {
        super.draw();
    }
}