import p5 from "p5";
import { BaseContainer } from "../BaseContainer";
import type { HorizontalAlign, VerticalAlign } from "../BaseContainer";
import type { BaseObject } from "../../objects/BaseObject";
import { RegisterDraw } from "../../tools/DrawDecorator";

export type CounterMode = "HIDDEN" | "ITEMS_QUANTITY" | "ITEMS_LENGTH"

export class BaseInventory<T extends BaseObject> extends BaseContainer {
    public items: (T | null | undefined)[];

    protected slotWidth!: number;
    protected slotHeight!: number;
    protected slotPadding: number = 10;
    protected slotsPerRow!: number;
    protected slotsPerCol!: number;

    protected offsetX: number = 0;
    protected offsetY: number = 0;

    protected slotRatio: number;

    protected readonly: boolean = false;
    protected showBorder: boolean = true;
    public allowInternalMovement: boolean;

    protected counterMode: CounterMode;

    public onItemDropped?: (origin: BaseInventory<T>, item: T) => void;
    protected onItemTriggered?: (origin: BaseInventory<T>, item: T) => void;

    constructor(p: p5, items: T[], slotsPerRow: number, slotsPerCol: number, widthRatio: number, heightRatio: number, horizontalAlign: HorizontalAlign = "LEFT", verticalAlign: VerticalAlign = "TOP", parent?: BaseContainer, readonly: boolean = true, slotRatio: number = 1, showBorder: boolean = true, allowInternalMovement: boolean = true, counterMode: CounterMode = "HIDDEN") {
        super(p, widthRatio, heightRatio, horizontalAlign, verticalAlign, parent);
        this.items = items;
        this.slotsPerRow = slotsPerRow;
        this.slotsPerCol = slotsPerCol;
        this.slotRatio = slotRatio;
        this.readonly = readonly;
        this.showBorder = showBorder;
        this.allowInternalMovement = allowInternalMovement;
        this.counterMode = counterMode;
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

    public initItemSetup() {
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

    private initItemMovement(item: T) {
        item.initEvents();
        item.onObjectRelease = (mouseX: number, mouseY: number) => {
            const ix = Math.floor((mouseX - this.x - this.offsetX + this.slotWidth / 2) / this.slotWidth);
            const iy = Math.floor((mouseY - this.y - this.offsetY + this.slotHeight / 2) / this.slotHeight);

            if (
                ix < 0 || ix >= this.slotsPerRow ||
                iy < 0 || iy >= this.slotsPerCol
            ) {                
                // External movement handled
                this.onItemDropped && this.onItemDropped(this, item);
                return;
            }

            if (!this.allowInternalMovement) return;

            const targetIndex = iy * this.slotsPerRow + ix;
            const currentIndex = this.items.indexOf(item);

            if (targetIndex === currentIndex) {
                this.onItemTriggered && this.onItemTriggered(this, item);
            }

            const targetItem = this.items[targetIndex];
            this.items[targetIndex] = item;
            this.items[currentIndex] = targetItem;

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
                p.initEvents();
            });
        };
    }

    public addItems(...newItems: T[]) {
        // TODO: how to handle the limit available
        for (let i = 0; i < this.items.length; i++) {
            if (!this.items[i]) {
                const newItem = newItems.pop();
                if (!newItem) break;
    
                // Fill the holes
                this.items[i] = newItem;
            }
        }

        // Pieces remaining?
        if (newItems.length > 0) {
            this.items.unshift(...newItems);
        }

        this.initItemSetup();
    }

    public removeItem(item: T) {
        const currentIndex = this.items.indexOf(item);
        // Make the slot empty
        this.items[currentIndex] = undefined;

        // Remove the events attach to the slot area
        item.clearEvents();
    }

    public pickUpItem(origin: BaseInventory<T>, item: T) {
        const ix = Math.floor((item.mouseX + this.slotWidth / 2 - this.x - this.offsetX) / this.slotWidth);
        const iy = Math.floor((item.mouseY + this.slotWidth / 2 - this.y - this.offsetY) / this.slotHeight);

        if (
            ix < 0 || ix >= this.slotsPerRow ||
            iy < 0 || iy >= this.slotsPerCol
        ) return;

        const targetIndex = iy * this.slotsPerRow + ix;
        
        // Can't overwrite a piece
        if (this.items[targetIndex]) return;

        item.quantity -= 1;
        // Remove it from the first inventory
        if (item.quantity <= 0) {
            origin.removeItem(item);
        }

        const itemCloned = item.clone();

        // Add the piece to the list
        this.items[targetIndex] = itemCloned;

        const pos = this.getSlotPosition(
          Math.floor(targetIndex / this.slotsPerRow),
          targetIndex % this.slotsPerRow
        );
        itemCloned.x = pos.x + this.slotPadding / 2;
        itemCloned.y = pos.y + this.slotPadding / 2;
        itemCloned.setCollider(pos.x, pos.y, this.slotWidth, this.slotHeight);

        this.initItemMovement(itemCloned);
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
                
                if (item && (!item.isHeld || item.quantity > 1)) {
                    item.draw({
                        maxX: (this.slotWidth - this.slotPadding),
                        maxY: (this.slotHeight - this.slotPadding)
                    });
                    this.counterMode !== "HIDDEN" && this.drawCounter(item.x, item.y, item.quantity - (item.isHeld ? 1 : 0));
                }
            }
        }

        // Draw held item(s) last for correct z-index
        for (const item of this.items ?? []) {
            if (item && item.isHeld) {
                item.draw();
            }
        }
    }

    @RegisterDraw(1)
    private drawCounter(x: number, y: number, value: number) {
        const size = Math.min(this.slotWidth, this.slotHeight)/4;

        this.p.stroke(80);
        this.p.fill(255, 0, 0);
        this.p.ellipse(x, y, size, size);
        this.p.fill(255);
        this.p.strokeWeight(size/10);
        this.p.textSize(size/1.5);
        this.p.textAlign(this.p.CENTER, this.p.CENTER);
        this.p.text(this.counterMode === "ITEMS_QUANTITY" ? value : this.items.length, x, y);
    }

    public draw(): void {
        this.showBorder && this.drawSlots();
        this.drawItems();
    }
}