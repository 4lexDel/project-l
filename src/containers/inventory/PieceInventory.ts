import p5 from "p5";
import { Piece } from "../../objects/Piece";
import { BaseContainer } from "./../BaseContainer";
import type { HorizontalAlign, VerticalAlign } from "./../BaseContainer";
import { BaseInventory, type CounterMode } from "./BaseInventory";
// import { Modal } from "../../tools/Modal";

export class PieceInventory extends BaseInventory<Piece> {
    // private modalOption: Modal;

    constructor(p: p5, pieces: Piece[], slotsPerRow: number, slotsPerCol: number, widthRatio: number, heightRatio: number, horizontalAlign: HorizontalAlign = "LEFT", verticalAlign: VerticalAlign = "TOP", parent?: BaseContainer, readonly: boolean = true, showBorder: boolean = true, allowInternalMovement: boolean = true, counterMode: CounterMode = "HIDDEN") {
        super(p, pieces, slotsPerRow, slotsPerCol, widthRatio, heightRatio, horizontalAlign, verticalAlign, parent, readonly, 1, showBorder, allowInternalMovement, counterMode);

        // this.modalOption = new Modal(p, "CENTER", "TOP")

        this.resize();

        this.onItemTriggered = (_: BaseInventory<Piece>, piece: Piece) => {            
            // this.modalOption.open(piece.x + this.slotWidth/2 - this.slotPadding/2, piece.y - this.slotPadding/2, this.slotWidth *2 , this.slotHeight);
            piece.rotate();
        };
    }

    public resize() {
        super.resize();
    }

    public draw(): void {
        super.draw();
        // this.modalOption.draw();
    }
}