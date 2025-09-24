import p5 from "p5";
import { BaseObject } from "../objects/BaseObject";

export type VerticalAlign = "TOP" | "BOTTOM" | "CENTER";
export type HorizontalAlign = "LEFT" | "RIGHT" | "CENTER";

export class BaseContainer extends BaseObject {
    protected widthRatio: number;
    protected heightRatio: number;

    public dx!: number;
    public dy!: number;

    public verticalAlign: VerticalAlign;
    public horizontalAlign: HorizontalAlign;

    private parentContainer?: BaseContainer;

    constructor(p: p5, widthRatio: number, heightRatio: number, horizontalAlign: HorizontalAlign = "LEFT", verticalAlign: VerticalAlign = "TOP", parentContainer?: BaseContainer) {
        super(p, -1, -1);
        this.widthRatio = widthRatio;
        this.heightRatio = heightRatio;
        this.horizontalAlign = horizontalAlign;
        this.verticalAlign = verticalAlign;

        this.parentContainer = parentContainer;
    }

    public setWidthRatio(widthRatio: number) {
        this.widthRatio = widthRatio;
        this.resize();
    }

    public setHeightRatio(heightRatio: number) {
        this.heightRatio = heightRatio;
        this.resize();
    }

    public setHorizontalAlign(horizontalAlign: HorizontalAlign) {
        this.horizontalAlign = horizontalAlign;
        this.resize();
    }

    public setVerticalAlign(verticalAlign: VerticalAlign) {
        this.verticalAlign = verticalAlign;
        this.resize();
    }

    public resize() {
        const parentX = this.parentContainer?.x ?? 0; 
        const parentY = this.parentContainer?.y ?? 0; 
        const parentWidth = this.parentContainer?.dx ?? this.p.width; 
        const parentHeight = this.parentContainer?.dy ?? this.p.height;

        this.dx = parentWidth * this.widthRatio;
        this.dy = parentHeight * this.heightRatio;

        switch (this.horizontalAlign) {
            case "CENTER":
                this.x = parentX + (parentWidth - this.dx) / 2;
                break;
            case "LEFT":
                this.x = parentX;
                break;
            case "RIGHT":
                this.x = parentX + parentWidth * (1 - this.widthRatio);
                break;
        }

        switch (this.verticalAlign) {
            case "CENTER":
                this.y = parentY + (parentHeight - this.dy) / 2;
                break;
            case "TOP":
                this.y = parentY
                break;
            case "BOTTOM":
                this.y = parentY + parentHeight * (1 - this.heightRatio);
                break;
        }     
    }

    public draw() {
        this.p.strokeWeight(2);
        this.p.stroke(50);
        this.p.noFill();
        this.p.rect(this.x, this.y, this.dx, this.dy);
    }
}