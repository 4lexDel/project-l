import p5 from "p5";
import { Piece } from "../../objects/Piece";
import { BaseContainer } from "./../BaseContainer";
import type { HorizontalAlign, VerticalAlign } from "./../BaseContainer";
import { BaseInventory } from "./BaseInventory";

export class PieceInventory extends BaseInventory {
    private pieces: Piece[];

    constructor(p: p5, pieces: Piece[], widthRatio: number, heightRatio: number, horizontalAlign: HorizontalAlign = "LEFT", verticalAlign: VerticalAlign = "TOP", parent?: BaseContainer, readonly: boolean = true) {
        super(p, widthRatio, heightRatio, horizontalAlign, verticalAlign, parent, readonly);
        this.pieces = pieces;//[...pieces, ...pieces];

        this.slotsPerRow = 10;
        this.slotsPerCol = 3;

        this.resize();
    }

    public resize() {
        super.resize();
        this.initPieceSetup();
    }

    private initPieceSetup() {
        for (let row = 0; row < this.slotsPerCol; row++) {
            for (let col = 0; col < this.slotsPerRow; col++) {
                const pieceIndex = row * this.slotsPerRow + col;
                const piece = this.pieces?.[pieceIndex];
                if (!piece) continue;

                const { x: slotX, y: slotY } = this.getSlotPosition(row, col);
                piece.x = slotX + this.slotPadding / 2;
                piece.y = slotY + this.slotPadding / 2;

                if (this.readonly) continue;

                piece.setCollider(slotX, slotY, this.slotWidth, this.slotHeight);

                this.initPieceMovement(piece);
            }
        }
    }

    private initPieceMovement(piece: Piece) {
        piece.initEvent();
        piece.onObjectRelease = (mouseX: number, mouseY: number) => {
            const ix = Math.floor((mouseX - this.x - this.offsetX + this.slotWidth / 2) / this.slotWidth);
            const iy = Math.floor((mouseY - this.y - this.offsetY + this.slotHeight / 2) / this.slotHeight);

            if (
                ix < 0 || ix >= this.slotsPerRow ||
                iy < 0 || iy >= this.slotsPerCol
            ) return;

            const targetIndex = iy * this.slotsPerRow + ix;
            const currentIndex = this.pieces.indexOf(piece);

            if (targetIndex === currentIndex) return;

            const targetPiece = this.pieces[targetIndex];
            this.pieces[targetIndex] = piece;
            this.pieces[currentIndex] = targetPiece as Piece;

            // Update positions and colliders for both pieces
            [piece, targetPiece].forEach((p, idx) => {
                if (!p) return;
                const pos = this.getSlotPosition(
                    idx === 0 ? iy : Math.floor(currentIndex / this.slotsPerRow),
                    idx === 0 ? ix : currentIndex % this.slotsPerRow
                );
                p.x = pos.x + this.slotPadding / 2;
                p.y = pos.y + this.slotPadding / 2;
                p.setCollider(pos.x, pos.y, this.slotWidth, this.slotHeight);
                p.initEvent();
            });
        };
    }

    private drawPieces() {
        // Draw non-held pieces first
        for (let row = 0; row < this.slotsPerCol; row++) {
            for (let col = 0; col < this.slotsPerRow; col++) {
                const pieceIndex = row * this.slotsPerRow + col;
                const piece = this.pieces?.[pieceIndex];

                if (piece && !piece.isHeld) {
                    piece.draw({
                        maxX: (this.slotWidth - this.slotPadding),
                        maxY: (this.slotHeight - this.slotPadding)
                    });
                }
            }
        }

        // Draw held piece(s) last for correct z-index
        for (const piece of this.pieces ?? []) {
            if (piece && piece.isHeld) {
                piece.draw();
            }
        }
    }

    public draw(): void {
        super.draw();
        this.drawPieces();
    }
}