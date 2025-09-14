import p5 from "p5";
import { Piece } from "./Piece";

export class Lock extends Piece {
    private padding: number = 10;

    private lockDistFromCenter: number = 15;
    private lockSize: number = 10;

    constructor(p: p5, quantity: number) {
        super(p, [], p.color(255, 210, 100), 1, quantity);
        this.quantity = quantity;
    }

    public getObjectDimensions() {
        const diameter = this.lockDistFromCenter * 2 + this.lockSize + this.padding;
        return { objectWidth: diameter, objectHeight: diameter };
    }

    public draw(boundDisplay?: { maxX: number; maxY: number; }): void {
        let scaleX = 1, scaleY = 1;

        const { objectWidth: lockWidth, objectHeight: lockHeight } = this.getObjectDimensions();

        if (boundDisplay) {
            scaleX = boundDisplay.maxX / lockWidth;
            scaleY = boundDisplay.maxY / lockHeight;
        }

        const cx = this.isHeld && this.mouseX !== -1 ? this.mouseX : this.x;
        const cy = this.isHeld && this.mouseY !== -1 ? this.mouseY : this.y;

        const startX = cx + (lockWidth * scaleX) / 2;
        const startY = cy + (lockHeight * scaleY) / 2;

        this.p.strokeWeight(this.lockSize/20);
        this.p.stroke(100);
        this.p.fill(255, 210, 100);

        for (let j = 0; j < this.quantity; j++) {
            let angle = 2 * Math.PI * j / this.quantity;
            let ex = startX + (this.quantity < 2 ? 0 : 1) * Math.cos(angle) * this.lockDistFromCenter;
            let ey = startY + (this.quantity < 2 ? 0 : 1) * Math.sin(angle) * this.lockDistFromCenter;
            this.p.rect(ex - this.lockSize / 2, ey - this.lockSize / 2, this.lockSize, this.lockSize);
        }
    }
}