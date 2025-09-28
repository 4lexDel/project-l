import p5 from "p5";
import { Piece } from "../../objects/Piece";
import { BaseContainer } from "./../BaseContainer";
import type { HorizontalAlign, VerticalAlign } from "./../BaseContainer";
import { BaseInventory, InventoryOption } from "./BaseInventory";
import { PieceModal } from "../../tools/modals/PieceModal";

export class PieceInventory extends BaseInventory<Piece> {
    private modalOption: PieceModal;

    constructor(p: p5, pieces: Piece[], slotsPerRow: number, slotsPerCol: number, widthRatio: number, heightRatio: number, horizontalAlign: HorizontalAlign = "LEFT", verticalAlign: VerticalAlign = "TOP", parent?: BaseContainer, inventoryOptions?: InventoryOption) {
        super(p, pieces, slotsPerRow, slotsPerCol, widthRatio, heightRatio, horizontalAlign, verticalAlign, parent, inventoryOptions);

        this.modalOption = new PieceModal(p, "CENTER", "TOP");

        this.resize();
    }

    public initItemSetup(): void {
        super.initItemSetup();

        this.inventoryOptions.allowInternalMovement && this.items.forEach((piece: Piece | null | undefined) => {
            if (piece) piece.onObjectTriggered = () => {
                this.modalOption.open(piece.x + this.slotWidth/2 - this.slotPadding/2, piece.y - this.slotPadding/2, this.slotWidth * 3 , this.slotHeight);
                this.modalOption.onMirrorClicked = () => { piece.mirror(); };
                this.modalOption.onRotateClicked = () => { piece.rotate(); };
                this.modalOption.onUpgradeClicked = () => {
                    console.log("Upgrade clicked");
                    // piece.upgrade();                     TODO...
                };
            }
        });
    }

    public resize() {
        super.resize();
    }

    public draw(): void {
        super.draw();
        this.modalOption.draw();
    }
}