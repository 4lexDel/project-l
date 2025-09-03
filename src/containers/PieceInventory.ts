import p5 from "p5";
import { Piece } from "../objects/Piece";
import { BaseInventory } from "./BaseInventory";

export class PieceInventory extends BaseInventory {
    private pieces: Piece[];

    constructor(p: p5, pieces: Piece[], widthRatio: number, heightRatio: number, horizontalAlign: "LEFT" | "RIGHT" = "LEFT", verticalAlign: "TOP" | "BOTTOM" = "TOP") {
        super(p, widthRatio, heightRatio, horizontalAlign, verticalAlign);
        this.pieces = pieces;

        this.slotsPerRow = 5;
        this.slotsPerCol = 2;

        this.resize();
    }

    public resize() {
        super.resize();
        this.initPieceEvents();
    }

    private initPieceEvents() {
        for (let row = 0; row < this.slotsPerCol; row++) {
            for (let col = 0; col < this.slotsPerRow; col++) {
                const { x: slotX, y: slotY } = this.getSlotPosition(row, col);
                const pieceIndex = row * this.slotsPerRow + col;
                const piece = this.pieces?.[pieceIndex];

                if (piece) {
                    piece.x = slotX + this.slotPadding / 2;
                    piece.y = slotY + this.slotPadding / 2;
                    piece.setCollider(slotX, slotY, this.slotWidth, this.slotHeight);
                    piece.initEvent();
                }
            }
        }
    }

    private drawPieces() {
        // Draw non-held pieces first
        for (let row = 0; row < this.slotsPerCol; row++) {
            for (let col = 0; col < this.slotsPerRow; col++) {
                const { x: slotX, y: slotY } = this.getSlotPosition(row, col);
                const pieceIndex = row * this.slotsPerRow + col;
                const piece = this.pieces?.[pieceIndex];

                if (piece && !piece.isHeld) {
                    // Keep the piece stuck to the slot         <---------------------------------------- (anti pattern) = temporary fix
                    piece.x = slotX + this.slotPadding / 2;
                    piece.y = slotY + this.slotPadding / 2;

                    piece.draw({
                        maxX: (this.slotWidth - this.slotPadding),
                        maxY: (this.slotHeight - this.slotPadding)
                    });
                }
            }
        }

        // Draw held piece(s) last for correct z-index
        for (const piece of this.pieces ?? []) {
            if (piece.isHeld) {
                piece.draw();
            }
        }
    }

    public draw(): void {
        super.draw();
        this.drawPieces();
    }
}