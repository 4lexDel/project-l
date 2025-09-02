import p5 from "p5";
import { BaseContainer } from "./BaseContainer";
import { PieceFactory } from "../objects/PieceFactory";

export class Deck extends BaseContainer {
    private slotWidth: number = 100;
    private slotHeight: number = 100;
    private slotPadding: number = 10;
    private slotsPerRow: number = 5;
    private slotsPerCol: number = 2;

    constructor(p: p5, x: number, y: number, dx: number, dy: number) {
        super(p, x, y, dx, dy);

        this.pieces = [
            PieceFactory.create1block(p),
            PieceFactory.create2block(p),
            PieceFactory.create3block(p),
            PieceFactory.create4block(p),
            PieceFactory.createSquare(p),
            PieceFactory.createLblock(p),
            PieceFactory.createZigzag(p),
            PieceFactory.createCorner(p),
            PieceFactory.createSmallT(p),
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

    private drawInventory() {
        // Draw slots
        for (let row = 0; row < this.slotsPerCol; row++) {
            for (let col = 0; col < this.slotsPerRow; col++) {
                const { x: slotX, y: slotY } = this.getSlotPosition(row, col);
                this.p.fill(20);
                this.p.stroke(50);
                this.p.rect(slotX, slotY, this.slotWidth, this.slotHeight);
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
                    // Keep the piece stuck to the slot         <---------------------------------------- (anti pattern)
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
        this.drawInventory();
        this.drawPieces();
    }
}

// REFACTOR THE PIECE DRAWING