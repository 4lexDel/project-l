import p5 from "p5";
import { BaseContainer } from "../BaseContainer";
import type { HorizontalAlign, VerticalAlign } from "../BaseContainer";
import type { BaseObject } from "../../objects/BaseObject";
import { Piece } from "../../objects/Piece";

export class BaseInventory extends BaseContainer {
    protected items: BaseObject[];

    protected slotWidth!: number;
    protected slotHeight!: number;
    protected slotPadding: number = 10;
    protected slotsPerRow!: number;
    protected slotsPerCol!: number;

    protected offsetX: number = 0;
    protected offsetY: number = 0;

    protected slotRatio: number;

    protected readonly: boolean = false;

    constructor(p: p5, items: BaseObject[], widthRatio: number, heightRatio: number, horizontalAlign: HorizontalAlign = "LEFT", verticalAlign: VerticalAlign = "TOP", parent?: BaseContainer, readonly: boolean = true, slotRatio: number = 1) {
        super(p, widthRatio, heightRatio, horizontalAlign, verticalAlign, parent);
        this.items = items;
        this.slotRatio = slotRatio;
        this.readonly = readonly;
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

        this.initItemSetup();
    }

    private initItemSetup() {
        for (let row = 0; row < this.slotsPerCol; row++) {
            for (let col = 0; col < this.slotsPerRow; col++) {
                const itemIndex = row * this.slotsPerRow + col;
                const item = this.items?.[itemIndex];
                if (!item) continue;

                const { x: slotX, y: slotY } = this.getSlotPosition(row, col);
                item.x = slotX + this.slotPadding / 2;
                item.y = slotY + this.slotPadding / 2;

                if (this.readonly) continue;

                item.setCollider(slotX, slotY, this.slotWidth, this.slotHeight);

                this.initItemMovement(item);
            }
        }
    }

    private initItemMovement(item: BaseObject) {
        item.initEvent();
        item.onObjectRelease = (mouseX: number, mouseY: number) => {
            const ix = Math.floor((mouseX - this.x - this.offsetX + this.slotWidth / 2) / this.slotWidth);
            const iy = Math.floor((mouseY - this.y - this.offsetY + this.slotHeight / 2) / this.slotHeight);

            if (
                ix < 0 || ix >= this.slotsPerRow ||
                iy < 0 || iy >= this.slotsPerCol
            ) return;

            const targetIndex = iy * this.slotsPerRow + ix;
            const currentIndex = this.items.indexOf(item);

            if (targetIndex === currentIndex) return;

            const targetItem = this.items[targetIndex];
            this.items[targetIndex] = item;
            this.items[currentIndex] = targetItem as BaseObject;

            // Update positions and colliders for both items
            [item, targetItem].forEach((p, idx) => {
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
                this.p.strokeWeight(2);
                this.p.stroke(50);
                this.p.rect(slotX, slotY, this.slotWidth, this.slotHeight);
            }
        }
    }

    protected drawItems() {
        // Draw non-held items first
        for (let row = 0; row < this.slotsPerCol; row++) {
            for (let col = 0; col < this.slotsPerRow; col++) {
                const itemIndex = row * this.slotsPerRow + col;
                const item = this.items?.[itemIndex];

                if (item && !item.isHeld) {
                    item.draw({
                        maxX: (this.slotWidth - this.slotPadding),
                        maxY: (this.slotHeight - this.slotPadding)
                    });
                }
            }
        }

        // Draw held item(s) last for correct z-index
        for (const item of this.items ?? []) {
            if (item && item.isHeld) {
                if (item instanceof Piece) {
                    item.draw();
                }
                else {
                    item.draw({
                        maxX: (this.slotWidth - this.slotPadding),
                        maxY: (this.slotHeight - this.slotPadding)
                    });
                }
            }
        }
    }

    public draw(): void {
        // super.draw();
        this.drawSlots();
        this.drawItems();
    }
}