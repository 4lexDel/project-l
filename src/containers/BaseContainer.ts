import p5 from "p5";
import { BaseObject } from "../objects/BaseObject";

export class BaseContainer extends BaseObject {
    protected widthRatio: number;
    protected heightRatio: number;

    public dx!: number;
    public dy!: number;

    public verticalAlign: "TOP" | "BOTTOM";
    public horizontalAlign: "LEFT" | "RIGHT";

    constructor(p: p5, widthRatio: number, heightRatio: number, horizontalAlign: "LEFT" | "RIGHT" = "LEFT", verticalAlign: "TOP" | "BOTTOM" = "TOP") {
        super(p, -1, -1);
        this.widthRatio = widthRatio;
        this.heightRatio = heightRatio;
        this.horizontalAlign = horizontalAlign;
        this.verticalAlign = verticalAlign;
    }

    public resize() {
        this.x = this.horizontalAlign === "LEFT" ? 0 : this.p.width * (1 - this.widthRatio);
        this.y = this.verticalAlign === "TOP" ? 0 : this.p.height * (1 - this.heightRatio);

        this.dx = this.p.width * this.widthRatio;
        this.dy = this.p.height * this.heightRatio;
    }

    draw() {
        // draw a simple rect without background (border only small one 2 weight black)
        this.p.strokeWeight(2);
        this.p.stroke(50);
        this.p.noFill();
        this.p.rect(this.x, this.y, this.dx, this.dy);
    }
}