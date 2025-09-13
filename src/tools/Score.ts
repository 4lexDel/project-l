import p5 from "p5";
import { BaseObject } from "../objects/BaseObject";

export class Score extends BaseObject {
    public value: number;

    constructor(p: p5, x: number, y: number) {
        super(p, x, y);
        this.value = 0;
    }

    public draw() {
        this.p.fill(200);
        this.p.textSize(32);
        this.p.textAlign(this.p.LEFT, this.p.TOP);
        this.p.text(`Score: ${this.value}`, this.x, this.y);
    }
}