import p5 from "p5";
import { BaseContainer } from "./BaseContainer";
import type { HorizontalAlign, VerticalAlign } from "./BaseContainer";

export class ActionHelper extends BaseContainer {
    private padding: number = 10;

    constructor(p: p5, widthRatio: number, heightRatio: number, horizontalAlign: HorizontalAlign = "LEFT", verticalAlign: VerticalAlign = "TOP", parentContainer?: BaseContainer) {
        super(p, widthRatio, heightRatio, horizontalAlign, verticalAlign, parentContainer);

        this.resize();
    }

    public resize() {
        super.resize();
    }

    public draw(): void {
        super.draw();
        // Draw action helper
        this.drawActionHelper();
    }

    public drawActionHelper(): void {
        this.p.fill(200);
        this.p.rect(this.x + this.padding, this.y + this.padding, this.dx - this.padding * 2, this.dy - this.padding * 2, 5);
        this.p.noStroke();
        this.p.fill(50);
        this.p.textSize(this.dx/10);
        this.p.textAlign(this.p.CENTER, this.p.CENTER);
        this.p.text("Actions helper", this.x + this.dx/2, this.y + 4 * this.padding);
    }
}