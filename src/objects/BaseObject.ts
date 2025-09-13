import p5 from 'p5';
import { EventHandler } from '../EventHandler';

export class BaseObject {
    public p: p5;
    public x: number;
    public y: number;

    public blockSize = 20;

    public isHeld: boolean = false;

    public mouseX: number = -1;
    public mouseY: number = -1;

    public quantity: number;

    // Collider for the piece (override the shape & blocksize)
    protected collider!: { x: number; y: number; width: number; height: number };

    protected identifier: symbol;

    public onObjectRelease?: (x: number, y: number) => void;

    constructor(p: p5, x: number, y: number, quantity: number = 1) {
        this.p = p;
        this.x = x;
        this.y = y;
        this.quantity = quantity;

        this.identifier = Symbol("object");
    }

    public initEvent() {
        let eventHandler = EventHandler.getInstance(this.p);

        eventHandler.removeEventMousePressed(this.identifier);
        eventHandler.removeEventMouseDragged(this.identifier);
        eventHandler.removeEventMouseReleased(this.identifier);

        eventHandler.addEventMousePressed(this.identifier, () => {
            if (!this.isMouseInside(this.p.mouseX, this.p.mouseY)) return;
            this.isHeld = true;
            this.attachPieceToMouseCoords();
        });

        eventHandler.addEventMouseDragged(this.identifier, () => {
            if (!this.isHeld) return;
            this.attachPieceToMouseCoords();
        });

        eventHandler.addEventMouseReleased(this.identifier, () => {
            if (!this.isHeld) return;

            this.onObjectRelease?.(this.mouseX, this.mouseY);
            this.isHeld = false;
            this.mouseX = -1;
            this.mouseY = -1;
        });
    }

    public setCollider(x: number, y: number, width: number, height: number) {
        this.collider = { x, y, width, height };
    }

    public getObjectDimensions() {
        // Must be overridden
        return { objectWidth: -1, objectHeight: -1 };
    }

    public attachPieceToMouseCoords() {
        const { objectWidth, objectHeight } = this.getObjectDimensions();

        this.mouseX = this.p.mouseX - objectWidth / 2;
        this.mouseY = this.p.mouseY - objectHeight / 2;
    }

    public isMouseInside(mx: number, my: number): boolean {
        if (this.collider) {
            const { x, y, width, height } = this.collider;
            return mx > x && mx < x + width && my > y && my < y + height;
        }
        const { objectWidth, objectHeight } = this.getObjectDimensions();
        return mx > this.x && mx < this.x + objectWidth && my > this.y && my < this.y + objectHeight;
    }

    public draw(_?: { maxX: number; maxY: number }) {
        // Must be overridden
        throw new Error("Method not implemented.");
    }
}