import p5 from "p5";
import { Piece } from "../../objects/Piece";
import { BaseContainer } from "./../BaseContainer";
import type { HorizontalAlign, VerticalAlign } from "./../BaseContainer";
import { BaseInventory, type CounterMode } from "./BaseInventory";
import { Lock } from "../../objects/Lock";

export class PieceInventory extends BaseInventory {
    constructor(p: p5, pieces: Piece[] | Lock[], slotsPerRow: number, slotsPerCol: number, widthRatio: number, heightRatio: number, horizontalAlign: HorizontalAlign = "LEFT", verticalAlign: VerticalAlign = "TOP", parent?: BaseContainer, readonly: boolean = true, showBorder: boolean = true, allowInternalMovement: boolean = true, counterMode: CounterMode = "HIDDEN") {
        super(p, pieces, slotsPerRow, slotsPerCol, widthRatio, heightRatio, horizontalAlign, verticalAlign, parent, readonly, 1, showBorder, allowInternalMovement, counterMode);

        this.resize();
    }

    public resize() {
        super.resize();
    }

    public draw(): void {
        super.draw();
    }
}