import p5 from "p5";
import { BaseContainer } from "./BaseContainer";

export class Deck extends BaseContainer {
    constructor(p: p5, x: number, y: number, dx: number, dy: number) {
        super(p, x, y, dx, dy);
    }

    drawInventory() {
        const slotWidth = 100;
        const slotHeight = 100;
        const slotPadding = 20;
        const slotsPerRow = 5;
        const slotsPerCol = 2;
        const inventoryX = this.x;
        const inventoryY = this.y;

        this.p.fill(255);
        this.p.rect(inventoryX, inventoryY, slotWidth * slotsPerRow, slotHeight * slotsPerCol);

        for (let row = 0; row < slotsPerCol; row++) {
            for (let col = 0; col < slotsPerRow; col++) {
                const slotX = inventoryX + col * slotWidth;
                const slotY = inventoryY + row * slotHeight;
                this.p.fill(200);
                this.p.rect(slotX, slotY, slotWidth, slotHeight);

                // Draw piece inside the slot if it exists
                const pieceIndex = row * slotsPerRow + col;
                const piece = this.pieces?.[pieceIndex];
                if (piece) {
                    piece.y = slotY+slotPadding/2;
                    piece.x = slotX+slotPadding/2;

                    piece.draw({
                        maxX: slotWidth-slotPadding,
                        maxY: slotHeight-slotPadding
                    });
                }
            }
        }
    }

    draw(): void {
        super.draw();
        this.drawInventory();
    }
}