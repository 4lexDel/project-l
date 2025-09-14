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

    public usePiece(origin: BaseInventory<Piece>, piece: Piece, mouseX: number, mouseY: number) {
        console.log("use piece");
        console.log(origin);
        console.log(`x = ${mouseX} y = ${mouseY}`);
        console.log(piece);
    }

    public draw(): void {
        super.draw();
    }
}