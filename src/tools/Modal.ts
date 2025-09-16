import p5 from "p5";
import type { HorizontalAlign, VerticalAlign } from "../containers/BaseContainer";
import { EventHandler } from "../EventHandler";
import { RegisterDraw } from "./DrawDecorator";

export class Modal {
    private p: p5;

    private x!: number;
    private y!: number;

    private identifier: symbol;

    private width!: number;
    private height!: number;

    private isVisible: boolean = false;

    private horizontalAlign: HorizontalAlign = "LEFT";
    private verticalAlign: VerticalAlign = "TOP";

    private eventHandler: EventHandler;

    constructor(p: p5, horizontalAlign: HorizontalAlign = "LEFT", verticalAlign: VerticalAlign = "TOP") {
        this.p = p;

        this.identifier = Symbol("Modal");

        this.horizontalAlign = horizontalAlign;
        this.verticalAlign = verticalAlign;

        this.eventHandler = EventHandler.getInstance(p);

        this.initEvents();
    }

    private clearEvents() {
        this.eventHandler.removeEventMousePressed(this.identifier);
    }

    private initEvents() {
        this.clearEvents();

        this.eventHandler.addEventMousePressed(this.identifier, () => {
            let coords = this.getCoordsOrigin();

            if (
                this.p.mouseX < coords.x || this.p.mouseX > coords.x + this.width ||
                this.p.mouseY < coords.y || this.p.mouseY > coords.y + this.height
            ) {
                this.close();
            }
        }, 1);
    }

    public open(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width; 
        this.height = height;

        this.isVisible = true;
        this.initEvents();
        this.eventHandler.setPriorityLimiter(1);
    }

    public close() {        
        this.isVisible = false;
        this.eventHandler.setPriorityLimiter(0);

        this.clearEvents();
    }

    private getCoordsOrigin() {
        let x = this.x;
        let y = this.y;

        if (this.horizontalAlign === "CENTER") x -= this.width/2;
        else if (this.horizontalAlign === "LEFT") x -= this.width;

        if (this.verticalAlign === "CENTER") y -= this.height/2;
        if (this.verticalAlign === "TOP") y -= this.height;

        return { x, y }
    }

    @RegisterDraw(0)
    public draw() {
        if (this.isVisible) {
            
            this.p.strokeWeight(2);
            this.p.stroke(200);
            this.p.fill(50);

            let coords = this.getCoordsOrigin();

            this.p.rect(coords.x, coords.y, this.width, this.height);
        }
    }
}