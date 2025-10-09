import p5 from "p5";
import { Piece } from "../../objects/Piece";
import { BaseContainer } from "./../BaseContainer";
import type { HorizontalAlign, VerticalAlign } from "./../BaseContainer";
import { BaseInventory, InventoryOption } from "./BaseInventory";
import { PieceModal } from "../../tools/modals/PieceModal";

export class PieceInventory extends BaseInventory<Piece> {
    private modalOption: PieceModal;

    public onPieceUpgradeRequested?: (origin: PieceInventory, piece: Piece) => void;

    constructor(p: p5, pieces: Piece[], slotsPerRow: number, slotsPerCol: number, widthRatio: number, heightRatio: number, horizontalAlign: HorizontalAlign = "LEFT", verticalAlign: VerticalAlign = "TOP", parent?: BaseContainer, inventoryOptions?: InventoryOption) {
        super(p, pieces, slotsPerRow, slotsPerCol, widthRatio, heightRatio, horizontalAlign, verticalAlign, parent, inventoryOptions);

        this.modalOption = new PieceModal(p, "CENTER", "TOP");

        this.resize();
    }

    public setDefaultLockPolicy() {
        this.inventoryOptions.readonly = false;
        this.items.forEach((piece: Piece | null | undefined) => {
            if (piece && piece.tier === 1) piece.locked = false;
            else if (piece) piece.locked = true;
        });
    }

    public setUpgradeLockPolicyFromPiece(pieceRef: Piece) {
        this.inventoryOptions.readonly = true;
        this.items.forEach((piece: Piece | null | undefined) => {
            if (piece) {
                // Skip n tier if tier +1, tier +2, ..., tier +n is missing
                let tierToCheck = pieceRef.tier + 1;
                while (tierToCheck < piece.tier) {
                    const found = this.items.find((p: Piece | null | undefined) => p && p.tier === tierToCheck && p.name !== pieceRef.name);
                    if (found) break;
                    tierToCheck++;
                }

                if (tierToCheck >= piece.tier && piece.name !== pieceRef.name) piece.locked = false;
                else piece.locked = true;
            }
        });
    }

    public clearPiecesLock() {
        this.inventoryOptions.readonly = false;
        this.items.forEach((piece: Piece | null | undefined) => {
            if (piece) piece.locked = false;
        });
    }

    public initItemSetup(): void {
        super.initItemSetup();

        this.inventoryOptions.allowInternalMovement && this.items.forEach((piece: Piece | null | undefined) => {
            if (piece) piece.onObjectTriggered = () => {
                this.modalOption.open(piece.x + this.slotWidth/2 - this.slotPadding/2, piece.y - this.slotPadding/2, this.slotWidth * 3 , this.slotHeight);
                this.modalOption.onMirrorClicked = () => { piece.mirror(); };
                this.modalOption.onRotateClicked = () => { piece.rotate(); };
                this.modalOption.onUpgradeClicked = () => {
                    this.onPieceUpgradeRequested?.(this, piece);
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