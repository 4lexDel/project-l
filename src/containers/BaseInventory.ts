import p5 from "p5";
import { BaseContainer } from "./BaseContainer";
import type { HorizontalAlign, VerticalAlign } from "./BaseContainer";

export class BaseInventory extends BaseContainer {
    protected slotWidth!: number;
    protected slotHeight!: number;
    protected slotPadding: number = 10;
    protected slotsPerRow!: number;
    protected slotsPerCol!: number;

    protected offsetX: number = 0;
    protected offsetY: number = 0;

    protected slotRatio: number;

    constructor(p: p5, widthRatio: number, heightRatio: number, horizontalAlign: HorizontalAlign = "LEFT", verticalAlign: VerticalAlign = "TOP", parent?: BaseContainer, slotRatio: number = 1) {
        super(p, widthRatio, heightRatio, horizontalAlign, verticalAlign, parent);
        this.slotRatio = slotRatio;
    }

    public resize() {
        super.resize();

        this.slotWidth = Math.min(
            this.dx / this.slotsPerRow, 
            (this.dy / this.slotsPerCol) / this.slotRatio
        );
        this.slotHeight = this.slotWidth * this.slotRatio;

        this.offsetX = (this.dx - this.slotWidth * this.slotsPerRow) / 2;
        this.offsetY = (this.dy - this.slotHeight * this.slotsPerCol) / 2;
    }

    protected getSlotPosition(row: number, col: number) {
        const x = this.x + col * this.slotWidth + this.offsetX;
        const y = this.y + row * this.slotHeight + this.offsetY;
        return { x, y };
    }

    protected drawSlots() {
        for (let row = 0; row < this.slotsPerCol; row++) {
            for (let col = 0; col < this.slotsPerRow; col++) {
                const { x: slotX, y: slotY } = this.getSlotPosition(row, col);
                this.p.fill(20);
                this.p.stroke(50);
                this.p.rect(slotX, slotY, this.slotWidth, this.slotHeight);
            }
        }
    }

    public draw(): void {
        super.draw();
        this.drawSlots();
    }
}