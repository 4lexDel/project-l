import p5 from "p5";
import { BaseInventory } from "./BaseInventory";
import { Puzzle } from "../objects/Puzzle";
import { BaseContainer } from "./BaseContainer";
import type { HorizontalAlign, VerticalAlign } from "./BaseContainer";

export class PuzzleInventory extends BaseInventory {
    private puzzles: Puzzle[];

    constructor(p: p5, puzzles: Puzzle[], widthRatio: number, heightRatio: number, horizontalAlign: HorizontalAlign = "LEFT", verticalAlign: VerticalAlign = "TOP", parent?: BaseContainer) {
        super(p, widthRatio, heightRatio, horizontalAlign, verticalAlign, parent);
        this.puzzles = puzzles;

        this.slotsPerRow = 4;
        this.slotsPerCol = 1;

        this.resize();
    }

    public resize(): void {
        super.resize();
    }

    public drawPuzzles(): void {
        // COMING SOON
    }

    public draw(): void {
        super.draw();
        this.drawPuzzles();
    }
}