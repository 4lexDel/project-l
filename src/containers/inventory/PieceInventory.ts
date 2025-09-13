import p5 from "p5";
import { Piece } from "../../objects/Piece";
import { BaseContainer } from "./../BaseContainer";
import type { HorizontalAlign, VerticalAlign } from "./../BaseContainer";
import { BaseInventory } from "./BaseInventory";

export class PieceInventory extends BaseInventory {
    constructor(p: p5, pieces: Piece[], widthRatio: number, heightRatio: number, horizontalAlign: HorizontalAlign = "LEFT", verticalAlign: VerticalAlign = "TOP", parent?: BaseContainer, readonly: boolean = true) {
        super(p, pieces, widthRatio, heightRatio, horizontalAlign, verticalAlign, parent, readonly);

        this.slotsPerRow = 10;
        this.slotsPerCol = 3;

        this.resize();
    }

    public resize() {
        super.resize();
    }

    public draw(): void {
        super.draw();
    }
}