import p5 from "p5";
import { BaseContainer } from "./BaseContainer";
import { Piece } from "../objects/Piece";

export class Deck extends BaseContainer {
    private slotWidth: number = 100;
    private slotHeight: number = 100;
    private slotPadding: number = 10;
    private slotsPerRow: number = 5;
    private slotsPerCol: number = 2;

    constructor(p: p5, x: number, y: number, dx: number, dy: number) {
        super(p, x, y, dx, dy);

        this.pieces = [
            Piece.create1block(p),
            Piece.create2block(p),
            Piece.create3block(p),
            Piece.create4block(p),
            Piece.createSquare(p),
            Piece.createLblock(p),
            Piece.createZigzag(p),
            Piece.createCorner(p),
            Piece.createSmallT(p),
        ];

        this.resize();
        this.initPieceEvents();
    }

    resize() {
        this.slotWidth = Math.min(this.dx / (2 * this.slotsPerRow), this.dy/2);
        this.slotHeight = this.slotWidth;
        this.initPieceEvents();
    }

    private getSlotPosition(row: number, col: number) {
        const x = this.x + col * this.slotWidth;
        const y = this.y + row * this.slotHeight;
        return { x, y };
    }

    initPieceEvents() {
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

    drawInventory() {
        // Draw slots
        for (let row = 0; row < this.slotsPerCol; row++) {
            for (let col = 0; col < this.slotsPerRow; col++) {
                const { x: slotX, y: slotY } = this.getSlotPosition(row, col);
                this.p.fill(200);
                this.p.rect(slotX, slotY, this.slotWidth, this.slotHeight);
            }
        }
    }

    drawPieces() {
        const maxPieceShapeDim = Math.max(
            ...(this.pieces ?? []).map(piece => {
                const { pieceShapeWidth, pieceShapeHeight } = piece.getPieceShapeDimensions();
                return Math.max(pieceShapeWidth, pieceShapeHeight);
            })
        );

        // Draw non-held pieces first
        for (let row = 0; row < this.slotsPerCol; row++) {
            for (let col = 0; col < this.slotsPerRow; col++) {
                const { x: slotX, y: slotY } = this.getSlotPosition(row, col);
                const pieceIndex = row * this.slotsPerRow + col;
                const piece = this.pieces?.[pieceIndex];

                if (piece && !piece.isHeld) {
                    const { pieceShapeWidth, pieceShapeHeight } = piece.getPieceShapeDimensions();

                    // Keep the piece stuck to the slot
                    piece.x = slotX + this.slotPadding / 2;
                    piece.y = slotY + this.slotPadding / 2;
                    piece.draw({
                        maxX: (this.slotWidth - this.slotPadding) * (pieceShapeWidth / maxPieceShapeDim),
                        maxY: (this.slotHeight - this.slotPadding) * (pieceShapeHeight / maxPieceShapeDim)
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

    draw(): void {
        super.draw();
        this.drawInventory();
        this.drawPieces();
    }
}

// REFACTOR THE PIECE DRAWING